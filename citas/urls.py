from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('crear-citas/', views.crearcitas, name="crearcitas"),
    
    path('crear-citas2/', views.crearcitas2, name="crearcitas2"),
    
    path('editar-citas/<int:cita_id>/', views.editarcitas, name="editarcitas"),
    
    path('list-citas/', views.citas_agendadas, name="listcitas"),
    
    path('cancelar-cita/<int:cita_id>/', views.cancelar_cita, name='cancelar_cita'),
    
    path('confirmar-actualizacion/<int:cita_id>/', views.confirmar_actualizacion_cita, name='confirmar_actualizacion_cita'),
    
    path('get-horas-disponibles/', views.get_horas_disponibles, name='get_horas_disponibles'),
    
    path('oauth2callback/', views.oauth2callback, name='oauth2callback'),
    
    path('initiate_oauth/', views.initiate_oauth, name='initiate_oauth'),
    
    path('reporte-excel/', views.reporte_citas_excel, name='reporte_excel'),
    
    path('reporte-pdf/', views.reporte_citas_pdf, name='reporte_pdf'),
]
