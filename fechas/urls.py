from django.urls import path
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('crear-fechas/', views.crearfechas, name="crearfechas"),
    path('list-fechas/', views.listfechas, name="listfechas"),
    path('eliminarfechas/<int:id>/', views.eliminarfechas, name="eliminarfechas"),
    path('reporte-excel-fechas/', views.reporte_fechas_excel, name='reporte_excel_fechas'),
    path('reporte-pdf-fechas/', views.reporte_fechas_pdf, name='reporte_pdf_fechas'),
]