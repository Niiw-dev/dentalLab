from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('crear-historias/', views.crearhistorias, name="crearhistorias"),
    path('ver-historias/<int:id>', views.verhistorias, name="verhistorias"),
    path('list-historias/', views.listhistorias, name="listhistorias"),
    path('eliminarhistorias/<int:id>/', views.eliminarhistorias, name="eliminarhistorias"),
    path('fetch-user-details/', views.fetch_user_details, name='fetch_user_details'),
    path('reporte-excel-historia/', views.reporte_historia_excel, name='reporte_excel_historia'),
    path('reporte-pdf-historia/', views.reporte_historia_pdf, name='reporte_pdf_historia'),
]