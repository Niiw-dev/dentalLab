import logging
import os

from django.conf import settings
from django.contrib.auth.decorators import login_required, user_passes_test
from django.core.mail import send_mail
from django.db import IntegrityError
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views.decorators.cache import never_cache

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

import inicio.views as traer


# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Configura el flujo OAuth2
flow = Flow.from_client_secrets_file(
    'config/credentials.json',
    scopes=['https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/gmail.labels']
)
flow.redirect_uri = 'http://localhost:8000/gmail/oauth2callback2/'


@never_cache
@login_required(login_url='acceso_denegado')
@user_passes_test(traer.es_superusuario, login_url='acceso_denegado')
def send_email(request):
    if request.method == 'POST':
        to = request.POST.get('to')
        subject = request.POST.get('subject')
        body = request.POST.get('body')
        
        if 'credentials' not in request.session:
            return redirect('gmail_auth')

        try:
            credentials = Credentials(**request.session['credentials'])
            
            if credentials.expired and credentials.refresh_token:
                credentials.refresh(Request())
                request.session['credentials'] = credentials_to_dict(credentials)
                
            service = build('gmail', 'v1', credentials=credentials)

            message = create_message('me', to, subject, body)
            send_message(service, 'me', message)

            return redirect('gmail_inbox')
        
        except HttpError as error:
            logger.error(f"Error al enviar el correo: {error}")
            return HttpResponse("Error al enviar el correo", status=500)
    
    return HttpResponse("Método no permitido", status=405)


def create_message(sender, to, subject, body):
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    import base64

    message = MIMEMultipart()
    message['to'] = to
    message['from'] = sender
    message['subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
    return {'raw': raw_message}


def send_message(service, sender, message):
    try:
        message = service.users().messages().send(userId=sender, body=message).execute()
        logger.info(f"Mensaje enviado: {message['id']}")
        return message
    except HttpError as error:
        logger.error(f"Error al enviar el mensaje: {error}")
        raise


@never_cache
@login_required(login_url='acceso_denegado')
@user_passes_test(traer.es_superusuario, login_url='acceso_denegado')
def gmail_auth(request):
    if 'credentials' in request.session:
        del request.session['credentials']
    authorization_url, _ = flow.authorization_url(prompt='consent', access_type='offline')
    return redirect(authorization_url)


@never_cache
@login_required(login_url='acceso_denegado')
@user_passes_test(traer.es_superusuario, login_url='acceso_denegado')
def oauth2callback2(request):
    try:
        flow.fetch_token(code=request.GET.get('code'))
        credentials = flow.credentials
        
        # Log the credentials (be careful not to log sensitive information in production)
        logger.info(f"Credentials obtained: {credentials}")
        
        # Guarda las credenciales en la sesión
        credentials_dict = credentials_to_dict(credentials)
        request.session['credentials'] = credentials_dict
        logger.info(f"Credentials saved to session: {credentials_dict}")
        
        return redirect('gmail_inbox')
    except Exception as e:
        logger.error(f"Error en oauth2callback: {e}")
        return HttpResponse("Error during authentication process", status=400)


@never_cache
@login_required(login_url='acceso_denegado')
@user_passes_test(traer.es_superusuario, login_url='acceso_denegado')
def gmail_inbox(request):
    if 'credentials' not in request.session:
        logger.info("No se encontraron credenciales, redirigiendo a autenticación")
        return redirect('gmail_auth')
    
    try:
        credentials_dict = request.session['credentials']
        credentials = Credentials(**credentials_dict)

        if credentials.expired and credentials.refresh_token:
            try:
                credentials.refresh(Request())
                request.session['credentials'] = credentials_to_dict(credentials)
            except Exception as e:
                logger.error(f"Error al refrescar el token: {e}")
                del request.session['credentials']
                return redirect('gmail_auth')

        service = build('gmail', 'v1', credentials=credentials)
        
        # Llamada a la API para obtener los mensajes
        results = service.users().messages().list(userId='me', maxResults=10).execute()
        messages = results.get('messages', [])

        email_list = []
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            email_list.append({
                'id': msg['id'],
                'subject': next((header['value'] for header in msg['payload']['headers'] if header['name'] == 'Subject'), 'No Subject'),
                'snippet': msg['snippet']
            })

        return render(request, 'gmail_inbox.html', {'email_list': email_list})

    except HttpError as error:
        logger.error(f"Error al acceder a Gmail: {error}")
        if error.resp.status in [401, 403]:
            del request.session['credentials']
            return redirect('gmail_auth')
    except Exception as e:
        logger.error(f"Unexpected error in gmail_inbox: {e}")
        return HttpResponse("An unexpected error occurred", status=500)

        
    return HttpResponse("Error al acceder a tus correos de Gmail", status=500)


def credentials_to_dict(credentials):
    return {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }

