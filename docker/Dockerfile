# Usamos una imagen oficial de Python como base
FROM python:3.11-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo de requisitos al contenedor
COPY . .

# Instalamos las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Realizamos las migraciones de la base de datos
RUN python manage.py migrate

# Recolectamos los archivos estáticos
RUN python manage.py collectstatic --noinput

# Exponemos el puerto 8000 donde se ejecutará la aplicación
EXPOSE 8000
# Usamos gunicorn para servir la aplicación Django
CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000"]


