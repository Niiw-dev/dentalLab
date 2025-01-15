from django.urls import path
from . import views


urlpatterns = [
    path('crear-elementos/', views.crearelementos, name="crearelementos"),
    path('editar-elementos/<int:id>', views.editarelementos, name="editarelementos"),
    path('list-elementos/', views.listelementos, name="listelementos"),
    path('eliminarelementos/<int:id>/', views.eliminarelementos, name="eliminarelementos"),
    path('reporte-excel-inventario/', views.reporte_inventario_excel, name='reporte_excel_inventario'),
    path('reporte-pdf-inventario/', views.reporte_inventario_pdf, name='reporte_pdf_inventario'),
]