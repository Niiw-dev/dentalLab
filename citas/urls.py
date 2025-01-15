from django.urls import path
from . import views  # Importa las vistas de la aplicación
from django.contrib.auth import views as auth_views  # Importa las vistas de autenticación

urlpatterns = [
    # Ruta para crear nuevas citas
    path('crear-citas/', views.crearcitas, name="crearcitas"),
    
    # Ruta alternativa para crear citas (puede ser una versión diferente)
    path('crear-citas2/', views.crearcitas2, name="crearcitas2"),
    
    # Ruta para editar una cita existente, se pasa el ID de la cita como parámetro
    path('editar-citas/<int:cita_id>/', views.editarcitas, name="editarcitas"),
    
    # Ruta para listar todas las citas agendadas
    path('list-citas/', views.citas_agendadas, name="listcitas"),
    
    # Ruta para cancelar una cita existente, se pasa el ID de la cita como parámetro
    path('cancelar-cita/<int:cita_id>/', views.cancelar_cita, name='cancelar_cita'),
    
    # Ruta para confirmar la actualización de una cita, se pasa el ID de la cita como parámetro
    path('confirmar-actualizacion/<int:cita_id>/', views.confirmar_actualizacion_cita, name='confirmar_actualizacion_cita'),
    
    # Ruta para obtener las horas disponibles para una cita
    path('get-horas-disponibles/', views.get_horas_disponibles, name='get_horas_disponibles'),
    
    # Ruta para manejar la redirección después de la autenticación OAuth2
    path('oauth2callback/', views.oauth2callback, name='oauth2callback'),
    
    # Ruta para iniciar el proceso de autenticación OAuth2
    path('initiate_oauth/', views.initiate_oauth, name='initiate_oauth'),
    
    # Ruta para generar un reporte de citas en formato Excel
    path('reporte-excel/', views.reporte_citas_excel, name='reporte_excel'),
    
    # Ruta para generar un reporte de citas en formato PDF
    path('reporte-pdf/', views.reporte_citas_pdf, name='reporte_pdf'),
]
