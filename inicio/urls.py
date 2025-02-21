from django.urls import path
from . import views
from django.contrib.auth.views import PasswordResetView
from django.contrib.auth import views as auth_views
from .views import BackupDatabaseView, RestoreDatabaseView, DeleteBackupView, backup_list, download_backup
from django.contrib.auth.views import PasswordResetView
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.urls import reverse_lazy
from django.contrib import messages
from django.shortcuts import render

from django.contrib.auth.views import PasswordResetView
from django.urls import reverse_lazy
from django.contrib import messages
from django.shortcuts import render, redirect


from django import forms
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


class CustomPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        label="Correo electrónico",
        max_length=254,
        widget=forms.EmailInput(attrs={'autocomplete': 'email'})
    )
    documento = forms.IntegerField(
        label="Número de documento",
        required=False,
        widget=forms.NumberInput(attrs={'autocomplete': 'off'})
    )

    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        documento = cleaned_data.get('documento')

        if email:
            active_users = get_user_model().objects.filter(correo__iexact=email, is_active=True)
            if not active_users.exists():
                raise ValidationError("No existe una cuenta activa asociada a este correo electrónico.")
            
            if active_users.count() > 1:
                if not documento:
                    raise ValidationError("Por favor, ingrese su número de documento para verificar su identidad.")
                user = active_users.filter(documento=documento).first()
                if not user:
                    raise ValidationError("No se encontró un usuario con el correo y documento proporcionados.")
                cleaned_data['user'] = user
            else:
                cleaned_data['user'] = active_users.first()

        return cleaned_data

    def get_users(self, email):
        if 'user' in self.cleaned_data:
            return [self.cleaned_data['user']]
        return list(get_user_model()._default_manager.filter(
            correo__iexact=email, is_active=True
        ))
    

class CustomPasswordResetView(PasswordResetView):
    form_class = CustomPasswordResetForm
    template_name = 'password_reset_form.html'
    email_template_name = 'password_reset_email.html'
    html_email_template_name = 'password_reset_email.html'
    success_url = reverse_lazy('password_reset_done')

    def form_valid(self, form):
        try:
            email = form.cleaned_data.get('email')
            documento = form.cleaned_data.get('documento')
            users = form.get_users(email)

            if len(users) > 1 and not documento:
                form.add_error('documento', "Por favor, ingrese su número de documento para verificar su identidad.")
                return self.form_invalid(form)

            result = super().form_valid(form)
            messages.success(self.request, "Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña.")
            return result
        except ValidationError as error:
            form.add_error(None, error)
            return self.form_invalid(form)

    def form_invalid(self, form):
        messages.error(self.request, "Por favor, corrija los errores a continuación.")
        return super().form_invalid(form)

    def get(self, request, *args, **kwargs):
        form = self.form_class()
        return render(request, self.template_name, {'form': form})

urlpatterns = [
    path('inicio', views.inicio, name='inicio'),
    path('base/', views.base, name="base"),
    path('loginregister/', views.registrarme, name="loginregister"),
    path('acceso-denegado/', views.acceso_denegado, name='acceso_denegado'),
    path('acceso-denegado2/', views.acceso_denegado2, name='acceso_denegado2'),
    path('cuidados/', views.cuidados, name='cuidados'),
    path('about/', views.about, name='about'),
    path('', views.inicio_index, name='inicio_index'),

    path('backup-list/', backup_list, name='backup_list'),
    path('backup-create/', BackupDatabaseView.as_view(), name='backup_create'),
    path('restore/', RestoreDatabaseView.as_view(), name='restore_database'),
    path('download/<str:filename>/', download_backup, name='download_backup'),
    path('delete/', DeleteBackupView.as_view(), name='delete_backup'),
    
    path('password_reset/', CustomPasswordResetView.as_view(), name='password_reset'),    
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),
]