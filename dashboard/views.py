import logging

from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.core.cache import cache
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views.decorators.cache import never_cache

from inicio.forms import UserForm
from inicio.models import UserProfile, Cita


logger = logging.getLogger(__name__)

@never_cache
@login_required(login_url='acceso_denegado')
def signout(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            session_key = request.session.session_key
            user_id = request.user.id

            logout(request)

            cache.delete(f"user_{user_id}_*")

            if session_key:
                cache.delete(f"session_{session_key}_*")

        return redirect(reverse('loginregister'))
    
    return redirect(reverse('inicio'))

@never_cache
@login_required(login_url='acceso_denegado')
def dashboard(request):
    if request.user.is_superuser:
        # Si es superusuario, obtener todas las citas programadas
        citas = Cita.objects.filter(estado='Programada')
        return render(request, 'dashboard.html', {'user': request.user,'citas': citas})
    else:
        # Si es un paciente normal, obtener solo sus citas programadas
        return render(request, 'dashboard.html', {'user': request.user})


@never_cache
def politicas_de_privacidad(request):
    return render(request, 'politicasdeprivacidad.html')

@never_cache
def terminos_y_condiciones(request):
    return render(request, 'terminosycondiciones.html')

@never_cache
@login_required(login_url='acceso_denegado')
def configuracion(request, id):
    img_path = 'img/user.png'
    perfil_usuario = UserProfile.objects.get(id=id)
    if request.method == 'POST':
        form = UserForm(request.POST, request.FILES, instance=perfil_usuario)
        if form.is_valid():
            if 'imagen' in request.FILES:
                user_imagen = request.FILES['imagen']
                request.user.imagen = user_imagen
            form.save()
            return redirect('dashboard')
    else:
        form = UserForm(instance=perfil_usuario)
    return render(request, 'configuracion.html', {'form': form, 'img_path': img_path})

@never_cache
@login_required(login_url='acceso_denegado')
def calendario(request):
    if request.user.is_superuser:
        # Si es superusuario, obtener todas las citas programadas
        citas = Cita.objects.filter(estado='Programada')
    else:
        # Si es un paciente normal, obtener solo sus citas programadas
        citas = Cita.objects.filter(paciente=request.user, estado='Programada')
    
    return render(request, 'calendario.html', {'citas': citas})

