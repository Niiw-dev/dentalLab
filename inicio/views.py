from django.contrib.auth import login, authenticate
from django.db import IntegrityError
from django.shortcuts import render, redirect
import logging
from django.views.decorators.cache import never_cache
from django.urls import reverse
from django.core.cache import cache
from inicio.models import UserProfile
from django.core.exceptions import ValidationError

import os
import subprocess
from datetime import datetime
from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.contrib import messages
from django.core.paginator import Paginator
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
import os
from django.conf import settings
from django.shortcuts import render
from datetime import datetime

def es_superusuario(user):
    return user.is_superuser

def acceso_denegado(request):
    return render(request, 'acceso_denegado.html')


def acceso_denegado2(request):
    return render(request, 'acceso_denegado2.html')


logger = logging.getLogger(__name__)

@never_cache
def registrarme(request):
    error_message = None
    success_message = None

    if request.method == 'POST':
        if 'password1' in request.POST:
            terms_accepted = request.POST.get('terms_accepted') == 'true'
            privacy_accepted = request.POST.get('privacy_accepted') == 'true'
            
            if not (terms_accepted and privacy_accepted):
                error_message = 'Debe aceptar los términos y condiciones y la política de privacidad.'
                return render(request, 'loginregister.html', {'error': error_message})
            
            password1 = request.POST.get('password1')
            password2 = request.POST.get('password2')
            tipo = request.POST.get('type')
            documento = request.POST.get('documento')
            nombre = request.POST.get('nombre')
            correo = request.POST.get('correo')
            if not all([password1, password2, tipo, documento, nombre, correo]):
                error_message = 'Todos los campos son obligatorios.'
            elif password1 != password2:
                error_message = 'Las contraseñas no coinciden.'
            else:
                try:
                    # Crear instancia de UserProfile sin guardar
                    user = UserProfile(
                        tipo=tipo,
                        documento=documento,
                        nombre=nombre,
                        correo=correo
                    )
                    user.set_password(password1)
                    
                    # Realizar validación manual
                    try:
                        user.full_clean()
                    except ValidationError as e:
                        error_dict = e.message_dict
                        error_messages = []
                        for field, messages in error_dict.items():
                            error_messages.extend(messages)
                        error_message = ' '.join(error_messages)
                    else:
                        # Si no hay errores de validación, intentar guardar
                        try:
                            user.save()
                            success_message = 'Cuenta creada correctamente. Por favor inicie sesión.'
                        except IntegrityError:
                            error_message = 'Ya existe un usuario con este documento.'
                
                except Exception as e:
                    error_message = f'Error al crear el usuario: {str(e)}'
        else:
            documento = request.POST.get('documento')
            password = request.POST.get('contra')
            logger.debug(f"Intento de inicio de sesión para documento: {documento}")

            # Primero, verifica si existe un usuario con ese documento
            try:
                user_profile = UserProfile.objects.get(documento=documento)
                if not user_profile.is_active:
                    error_message = 'Esta cuenta está desactivada.'
                    logger.debug("Cuenta desactivada")
                else:
                    # Si la cuenta está activa, intenta la autenticación
                    user = authenticate(request, username=documento, password=password)
                    if user is not None:
                        login(request, user)
                        cache.set(f"user_{user.id}_last_login", str(datetime.now()))
                        return redirect('dashboard')
                    else:
                        error_message = 'Credenciales inválidas.'
                        logger.debug("Autenticación fallida")
            except UserProfile.DoesNotExist:
                error_message = 'Credenciales inválidas.'
                logger.debug("Usuario no encontrado")
    context = {
        'error': error_message,
        'done': success_message
    }
    return render(request, 'loginregister.html', context)


@never_cache
def base(request):
    return render(request, 'index.html')

@never_cache
def cuidados(request):
    return render(request, 'cuidados.html')

@never_cache
def about(request):
    return render(request, 'about.html')

@never_cache
def loginregister(request):
    return render(request, 'loginregister.html')

@never_cache
def inicio(request):
    return render(request, 'inicio.html')
def inicio_index(request):
    return render(request, 'inicio_index.html')


@method_decorator(never_cache, name='dispatch')
@method_decorator(login_required(login_url='acceso_denegado'), name='dispatch')
# Vista basada en clase para crear un respaldo de la base de datos
class BackupDatabaseView(View):
    def post(self, request, *args, **kwargs):
        try:
            # Obtener la configuración de la base de datos
            db_settings = settings.DATABASES['default']
            db_name = db_settings['NAME']
            db_user = db_settings['USER']
            db_password = db_settings['PASSWORD']
            db_host = db_settings['HOST']
            db_port = db_settings['PORT']

            # Crear el nombre del archivo de respaldo
            filename = request.POST.get('filename', f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.sql")
            backup_dir = os.path.join(settings.BASE_DIR, 'backups')
            backup_path = os.path.join(backup_dir, filename)

            # Asegurarse de que el directorio de respaldos existe
            os.makedirs(backup_dir, exist_ok=True)

            # Usa la ruta completa a mysqldump.exe
            mysqldump_path = r"C:\Program Files\MySQL\MySQL Server 9.0\bin\mysqldump.exe"

            # Comando para crear el respaldo
            command = (
                f"\"{mysqldump_path}\" -h {db_host} -P {db_port} -u {db_user} -p{db_password} "
                f"{db_name} > \"{backup_path}\""
            )

            # Ejecutar el comando y capturar la salida
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            if result.returncode != 0:
                messages.error(request, f"Error al crear el respaldo: {result.stderr}")
            else:
                messages.success(request, f"Respaldo creado exitosamente: {filename}")
        except Exception as e:
            messages.error(request, f"Error al crear el respaldo: {str(e)}")

        return redirect('backup_list')

@never_cache
@login_required(login_url='acceso_denegado')
def backup_list(request):
    backup_dir = os.path.join(settings.BASE_DIR, 'backups')
    backups = []
    fecha_filtro = request.GET.get('fecha')

    for filename in os.listdir(backup_dir):
        if filename.endswith('.sql'):
            file_path = os.path.join(backup_dir, filename)
            created_at = datetime.fromtimestamp(os.path.getctime(file_path))
            
            # Aplicar filtro de fecha si se proporciona
            if fecha_filtro:
                fecha_filtro_dt = datetime.strptime(fecha_filtro, '%Y-%m-%d').date()
                if created_at.date() != fecha_filtro_dt:
                    continue

            size = os.path.getsize(file_path)
            backups.append({
                'filename': filename,
                'created_at': created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'size': f"{size / 1024 / 1024:.2f} MB"
            })
    
    # Ordenar los backups por fecha de creación, del más reciente al más antiguo
    backups.sort(key=lambda x: x['created_at'], reverse=True)
    
    context = {
        'backups': backups,
        'fecha_filtro': fecha_filtro
    }
    
    return render(request, 'backup_list.html', context)

@method_decorator(never_cache, name='dispatch')
@method_decorator(login_required(login_url='acceso_denegado'), name='dispatch')
# Vista para restaurar la base de datos
class RestoreDatabaseView(View):
    def post(self, request, *args, **kwargs):
        # Obtener el nombre del archivo desde el campo oculto y eliminar espacios
        backup_filename = request.POST.get('backup_file', '').strip()

        if backup_filename:
            try:
                # Obtener la configuración de la base de datos
                db_settings = settings.DATABASES['default']
                db_name = db_settings['NAME']
                db_user = db_settings['USER']
                db_password = db_settings['PASSWORD']
                db_host = db_settings['HOST']
                db_port = db_settings['PORT']

                # Construir la ruta del archivo de respaldo
                backup_dir = os.path.join(settings.BASE_DIR, 'backups')
                backup_path = os.path.join(backup_dir, backup_filename)

                # Verificar que el archivo de respaldo existe
                if not os.path.exists(backup_path):
                    messages.error(request, "El archivo de respaldo especificado no existe.")
                    return redirect('backup_list')

                # Leer el contenido del archivo y restaurar la base de datos
                with open(backup_path, 'r') as backup_file:
                    command = [
                        "mysql",
                        "-h", db_host,
                        "-P", str(db_port),
                        "-u", db_user,
                        "-p" + db_password,
                        db_name,
                    ]

                    # Ejecutar el comando de MySQL y pasar el contenido del archivo
                    result = subprocess.run(command, stdin=backup_file, capture_output=True, text=True)

                    # Para depuración, imprime la salida del comando
                    print("Salida del comando:", result.stdout)
                    print("Error del comando:", result.stderr)

                    if result.returncode != 0:
                        messages.error(request, f"Error al restaurar la base de datos: {result.stderr}")
                    else:
                        messages.success(request, f"Base de datos restaurada desde {backup_filename}")

            except Exception as e:
                messages.error(request, f"Error al restaurar la base de datos: {str(e)}")
        else:
            messages.error(request, "No se especificó un archivo para restaurar")

        return redirect('backup_list')
@never_cache
@login_required(login_url='acceso_denegado')
# Vista para descargar un respaldo
def download_backup(request, filename):
    file_path = os.path.join(settings.BASE_DIR, 'backups', filename)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/octet-stream")
            response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)
            return response
    raise Http404

@method_decorator(never_cache, name='dispatch')
@method_decorator(login_required(login_url='acceso_denegado'), name='dispatch')
# Vista para eliminar un respaldo
class DeleteBackupView(View):
    def post(self, request, *args, **kwargs):
        filename = request.POST.get('filename')
        if filename:
            file_path = os.path.join(settings.BASE_DIR, 'backups', filename)
            if os.path.exists(file_path):
                os.remove(file_path)
                messages.success(request, f"Respaldo {filename} eliminado exitosamente")
            else:
                messages.error(request, f"El archivo {filename} no existe")
        else:
            messages.error(request, "No se especificó un archivo para eliminar")

        return redirect('backup_list')