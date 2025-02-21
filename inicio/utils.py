from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def enviar_correo_con_html(context):
    subject = "Asunto del correo"
    from_email = 'facturacionldsg@gmail.com'
    to_email = 'correaedwin195@gmail'
    text_content = 'Este es un mensaje alternativo en texto plano para clientes de correo que no soportan HTML.'
    html_content = render_to_string('password_reset_email.html', context)

    email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email.attach_alternative(html_content, "text/html")
    email.send()
