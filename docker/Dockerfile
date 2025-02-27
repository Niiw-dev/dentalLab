FROM python:3.11-slim

# Establecer el directorio de trabajo
WORKDIR /app/dental

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias y limpiar cachés
RUN pip install --no-cache-dir -r requirements.txt && \
    rm -rf /root/.cache

# Ejecutar las migraciones de la base de datos
RUN python manage.py migrate

# Recopilar los archivos estáticos en el directorio STATIC_ROOT (pero no los copiamos al contenedor)
RUN python manage.py collectstatic --noinput

# Exponer el puerto 8000
EXPOSE 8000

# Comando por defecto para ejecutar Gunicorn
# Cambiar el comando CMD en el Dockerfile para usar el servidor de desarrollo durante el desarrollo
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

