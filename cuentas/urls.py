from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('crear-cuentas/', views.crearcuentas, name="crearcuentas"),
    path('editar-cuentas/<int:id>', views.editarcuentas, name="editarcuentas"),
    path('eliminar_cuenta/<int:id>/', views.eliminar_cuenta, name='eliminar_cuenta'),
    path('activar_cuenta/<int:id>/', views.activar_cuenta, name='activar_cuenta'),
    path('list-cuentas/', views.listcuentas, name="listcuentas"),
    path('cambiar-password/', views.cambiar_password, name='cambiar_password'),
    path('fetch-user-details/', views.fetch_user_details, name='fetch_user_details'),
    path('reporte-excel-pacientes/', views.reporte_pacientes_excel, name='reporte_excel_pacientes'),
    path('reporte-pdf-pacientes/', views.reporte_pacientes_pdf, name='reporte_pdf_pacientes'),
]