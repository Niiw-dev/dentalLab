from django.contrib.auth import login, authenticate
from django.db import IntegrityError
from django.shortcuts import render, redirect
import logging
from django.views.decorators.cache import never_cache
from django.urls import reverse
from django.core.cache import cache
from inicio.models import UserProfile
from django.core.exceptions import ValidationError
import pdb

import os
import subprocess
import shutil
import pymysql
pymysql.install_as_MySQLdb()
from datetime import datetime
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.contrib import messages
from django.core.paginator import Paginator
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

logger = logging.getLogger(__name__)

def dd(*args):
    pdb.set_trace()


def es_superusuario(user):
    return user.is_superuser


def acceso_denegado(request):
    return render(request, 'acceso_denegado.html')


def acceso_denegado2(request):
    return render(request, 'acceso_denegado2.html')


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
                    user = UserProfile(
                        tipo=tipo,
                        documento=documento,
                        nombre=nombre,
                        correo=correo
                    )
                    user.set_password(password1)
                    
                    try:
                        user.full_clean()
                    except ValidationError as e:
                        error_dict = e.message_dict
                        error_messages = []
                        for field, messages in error_dict.items():
                            error_messages.extend(messages)
                        error_message = ' '.join(error_messages)
                    else:
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

            try:
                user_profile = UserProfile.objects.get(documento=documento)
                if not user_profile.is_active:
                    error_message = 'Esta cuenta está desactivada.'
                    logger.debug("Cuenta desactivada")
                else:
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
class BackupDatabaseView(View):
    def post(self, request, *args, **kwargs):
        try:
            db_settings = settings.DATABASES['default']
            db_name = db_settings['NAME']
            db_user = db_settings['USER']
            db_password = db_settings['PASSWORD']
            db_host = db_settings['HOST']
            db_port = db_settings['PORT']
            db_engine = db_settings['ENGINE']

            filename = request.POST.get('filename', f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
            backup_dir = os.path.join(settings.BASE_DIR, 'backups')
            backup_path = os.path.join(backup_dir, filename)

            os.makedirs(backup_dir, exist_ok=True)

            if 'mysql' in db_engine:
                connection = pymysql.connect(
                    host=db_host,
                    user=db_user,
                    password=db_password,
                    database=db_name,
                    port=int(db_port)
                )
                cursor = connection.cursor()

                cursor.execute("SHOW TABLES")
                tables = cursor.fetchall()

                with open(backup_path + '.sql', 'w') as backup_file:
                    for table in tables:
                        table_name = table[0]

                        cursor.execute(f"SHOW CREATE TABLE `{table_name}`")
                        create_table = cursor.fetchone()[1]
                        backup_file.write(f"{create_table};\n\n")

                        cursor.execute(f"SELECT * FROM `{table_name}`")
                        rows = cursor.fetchall()
                        for row in rows:
                            row_data = ", ".join([f"'{str(value)}'" for value in row])
                            backup_file.write(f"INSERT INTO `{table_name}` VALUES ({row_data});\n")
                        backup_file.write("\n")

                cursor.close()
                connection.close()
                messages.success(request, f"Respaldo MySQL creado exitosamente: {filename}.sql")
            elif 'sqlite' in db_engine:
                db_path = db_name  

                shutil.copy(db_path, backup_path + '.sqlite3')
                messages.success(request, f"Respaldo SQLite creado exitosamente: {filename}.sqlite3")

            else:
                messages.error(request, "El motor de base de datos no es compatible para respaldo.")
                return redirect('backup_list')

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
        if filename.endswith('.sql') or filename.endswith('.sqlite3'):  
            file_path = os.path.join(backup_dir, filename)
            created_at = datetime.fromtimestamp(os.path.getctime(file_path))
            
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
    
    backups.sort(key=lambda x: x['created_at'], reverse=True)
    
    context = {
        'backups': backups,
        'fecha_filtro': fecha_filtro
    }
    
    return render(request, 'backup_list.html', context)


@method_decorator(never_cache, name='dispatch')
@method_decorator(login_required(login_url='acceso_denegado'), name='dispatch')
class RestoreDatabaseView(View):
    def post(self, request, *args, **kwargs):
        try:
            filename = request.POST.get('filename')
            if not filename:
                messages.error(request, "No se proporcionó un archivo de respaldo.")
                return redirect('backup_list')

            backup_dir = os.path.join(settings.BASE_DIR, 'backups')
            backup_path = os.path.join(backup_dir, filename)

            if not os.path.exists(backup_path):
                messages.error(request, f"El archivo de respaldo {filename} no existe.")
                return redirect('backup_list')

            db_settings = settings.DATABASES['default']
            db_engine = db_settings['ENGINE']

            if 'mysql' in db_engine:
                connection = pymysql.connect(
                    host=db_settings['HOST'],
                    user=db_settings['USER'],
                    password=db_settings['PASSWORD'],
                    database=db_settings['NAME'],
                    port=int(db_settings['PORT'])
                )
                cursor = connection.cursor()

                with open(backup_path, 'r') as backup_file:
                    sql = backup_file.read()
                    cursor.execute(sql, multi=True)
                
                connection.commit()
                cursor.close()
                connection.close()

                messages.success(request, f"Base de datos restaurada exitosamente desde {filename}.")
            elif 'sqlite' in db_engine:
                shutil.copy(backup_path, db_settings['NAME'])
                messages.success(request, f"Base de datos restaurada exitosamente desde {filename}.")
            else:
                messages.error(request, "El motor de base de datos no es compatible para restauración.")
                return redirect('backup_list')

        except Exception as e:
            messages.error(request, f"Error al restaurar la base de datos: {str(e)}")

        return redirect('backup_list')


@never_cache
@login_required(login_url='acceso_denegado')
def download_backup(request, filename):
    try:
        backup_dir = os.path.join(settings.BASE_DIR, 'backups')
        backup_path = os.path.join(backup_dir, filename)

        if not os.path.exists(backup_path):
            raise Http404(f"El archivo {filename} no existe.")

        with open(backup_path, 'rb') as f:
            response = HttpResponse(f.read(), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            return response

    except Exception as e:
        raise Http404(f"Error al descargar el archivo: {str(e)}")

@method_decorator(never_cache, name='dispatch')
@method_decorator(login_required(login_url='acceso_denegado'), name='dispatch')
class DeleteBackupView(View):
    def post(self, request, *args, **kwargs):
        try:
            # Obtener el nombre del archivo a eliminar
            filename = request.POST.get('filename')
            if not filename:
                messages.error(request, "No se proporcionó un archivo para eliminar.")
                return redirect('backup_list')

            backup_dir = os.path.join(settings.BASE_DIR, 'backups')
            backup_path = os.path.join(backup_dir, filename)

            if not os.path.exists(backup_path):
                messages.error(request, f"El archivo {filename} no existe.")
                return redirect('backup_list')

            # Eliminar el archivo de respaldo
            os.remove(backup_path)
            messages.success(request, f"El archivo de respaldo {filename} ha sido eliminado exitosamente.")

        except Exception as e:
            messages.error(request, f"Error al eliminar el archivo de respaldo: {str(e)}")

        return redirect('backup_list')
