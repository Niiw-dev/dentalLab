from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone
from django.core.validators import MinValueValidator
from django.contrib.auth.password_validation import validate_password

class UserProfileManager(BaseUserManager):
    def create_user(self, documento, nombre, correo, password=None, tipo=2):
        if not documento:
            raise ValueError('El usuario debe tener un documento de Documento')
        if not correo:
            raise ValueError('El usuario debe tener un correo electrónico')

        user = self.model(
            documento=documento,
            nombre=nombre,
            correo=self.normalize_email(correo),
            tipo=tipo,
        )

         # Validación de contraseña
        try:
            validate_password(password, user)
        except ValidationError as e:
            raise ValidationError({"password": e.messages})


        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, documento, nombre, correo, password=None, tipo=2):
        user = self.create_user(
            documento=documento,
            nombre=nombre,
            correo=correo,
            password=password,
            tipo=tipo,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

def validate_document_length(value):
    if value < 10**7 or value >= 10**10:  # Rango para 8-10 dígitos
        raise ValidationError("El número de documento debe tener entre 8 y 10 dígitos.")

class UserProfile(AbstractBaseUser, PermissionsMixin):
    TIPO_CHOICES = (
        (1, 'T.I'),
        (2, 'C.C'),
        (3, 'C.E'),
        (4, 'C.I'),
    )
    
    tipo = models.PositiveSmallIntegerField(choices=TIPO_CHOICES, default=2)
    documento = models.IntegerField(unique=True, validators=[validate_document_length])
    nombre = models.CharField(max_length=50)
    imagen = models.ImageField(upload_to='imagenes/', blank=True, null=True)
    direccion = models.CharField(max_length=100, null=True, blank=True)
    correo = models.EmailField(max_length=100, null=True, blank=True)
    ocupacion = models.CharField(max_length=50, null=True, blank=True)
    celular = models.CharField(max_length=15, null=True, blank=True)  # Changed to CharField
    acudiente = models.CharField(max_length=50, null=True, blank=True)  # Changed default to blank=True
    edad = models.PositiveSmallIntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True, null=True, blank=True)
    is_admin = models.BooleanField(default=False, null=True, blank=True)
    is_superuser = models.BooleanField(default=False, null=True, blank=True)
    is_staff = models.BooleanField(default=False)  # Añadido campo is_staff


    objects = UserProfileManager()

    USERNAME_FIELD = 'documento'
    REQUIRED_FIELDS = ['nombre', 'correo']

    @classmethod
    def get_email_field_name(self):
        return 'correo'
    
    def delete(self, *args, **kwargs):
        self.is_active = False 
        self.save()

    def save(self, *args, **kwargs):
        # Resto del código
        if self.pk is None:
            self.is_active = True 
        super().save(*args, **kwargs)
    
    def __str__(self):
        return str(self.documento)

class Valoracion(models.Model):  # Changed to PascalCase
    OPCIONES_SI_NO_NO_SABE = (
        (1, 'Si'),
        (2, 'No'),
        (3, 'Desinformado'),
    )
    OPCIONES_SI_NO = (
        (1, 'Si'),
        (2, 'No'),
    )

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=150, blank=True) 
    documento = models.CharField(max_length=50, blank=True) 
    fecha_historia = models.DateField(null=True, blank=True) 
    tratamiento_medicacion = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO_NO_SABE, default=3)
    reacciones_alergicas = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO_NO_SABE, default=3)
    transtorno_tension_arterial = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO_NO_SABE, default=3)
    diabetes = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO_NO_SABE, default=3)
    transtornos_emocionales = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO_NO_SABE, default=3)
    enfermedad_respiratoria = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO_NO_SABE, default=3)
    otros = models.CharField(max_length=100, blank=True)

    protesis_dental = models.CharField(max_length=100, blank=True)
    total = models.CharField(max_length=100, blank=True)
    acrilico = models.CharField(max_length=100, blank=True)
    flexible = models.CharField(max_length=100, blank=True)
    parcial = models.CharField(max_length=100, blank=True)
    retenedores = models.CharField(max_length=100, blank=True)

    panoramica = models.CharField(max_length=100, blank=True)
    periapical = models.CharField(max_length=100, blank=True)

    cepillado_dental = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO)
    seda_dental = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO)
    enjuague_bucal = models.PositiveSmallIntegerField(choices=OPCIONES_SI_NO)

    def save(self, *args, **kwargs):
        if self.user:
            self.nombre = self.user.nombre
            self.documento = self.user.documento
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Valoración de {self.nombre} (Número: {self.documento})"

class Inventario(models.Model):
    ESTADO = (
        (1, 'Disponible'),
        (2, 'Agotado'),
    )
    producto = models.CharField(max_length=150, blank=True)
    cantidad = models.FloatField(default=0, validators=[MinValueValidator(0)])  # Ensure cantidad is never None
    estado = models.PositiveSmallIntegerField(choices=ESTADO, default=1)

    def save(self, *args, **kwargs):
        # If cantidad is None, set it to 0 before comparison
        if self.cantidad is None:
            self.cantidad = 0
        
        # Adjust estado based on cantidad
        
        if self.cantidad <= 0:
            self.estado = 2
        elif self.estado == 2:
            self.cantidad = 0 
        super().save(*args, **kwargs)

    def __str__(self):
        return self.producto


class Fecha(models.Model):
    fecha = models.DateField()
    hora = models.TimeField()
    fecha_hora = models.DateTimeField(editable=False) 
    disponible = models.BooleanField(default=True)

    class Meta:
        unique_together = ('fecha', 'hora')

    def __str__(self):
        return f"{self.fecha} {self.hora}"

    def save(self, *args, **kwargs):
        # Asignar fecha_hora como la combinación de fecha y hora
        self.fecha_hora = timezone.datetime.combine(self.fecha, self.hora)
        print(f"Guardando Fecha {self}. Disponible antes de guardar: {self.disponible}")
        super().save(*args, **kwargs)
        print(f"Fecha guardada. Disponible después de guardar: {self.disponible}")



class Cita(models.Model):
    ESTADO_CHOICES = (
        ('Programada', 'Programada'),
        ('Asistida', 'Asistida'),
        ('Cancelada', 'Cancelada'),
        ('Inasistida', 'No Asistió'),
    )

    MOTIVO_CHOICES = (
        ('protesis', 'Prótesis'),
        ('ortodoncia', 'Ortodoncia'),
    )

    paciente = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    fecha_hora = models.ForeignKey(Fecha, on_delete=models.CASCADE, related_name='citas')
    motivo = models.CharField(max_length=20, choices=MOTIVO_CHOICES, default='protesis')
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='Programada')
    asistio = models.BooleanField(default=False)
    google_event_id = models.CharField(max_length=255, blank=True, null=True)  # Campo nuevo

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        self.actualizar_disponibilidad(is_new)
        self.actualizar_estado_por_fecha()


    def actualizar_estado_por_fecha(self):
        if self.fecha_hora.fecha < timezone.now().date() and self.estado == 'Programada':
            self.estado = 'inasistida'
            self.save()

    def actualizar_disponibilidad(self, is_new):
        print(f"Actualizando disponibilidad para fecha_hora: {self.fecha_hora}")
        if is_new or self.estado == 'Programada':
            self.fecha_hora.disponible = False
        elif self.estado == 'Cancelada':
            citas_activas = Cita.objects.filter(
                fecha_hora=self.fecha_hora, 
                estado__in=['Programada', 'Asistida']
            ).exclude(pk=self.pk).exists()
            if not citas_activas:
                self.fecha_hora.disponible = True
        
        print(f"Guardando fecha_hora con disponibilidad: {self.fecha_hora.disponible}")
        self.fecha_hora.save()

    def cancelar_cita(self):
        if self.estado == 'Programada':
            self.estado = 'Cancelada'
            self.save()
            return True
        return False

    def confirmar_actualizacion(self):
        if self.estado == 'Programada':
            self.estado = 'Asistida'
            self.asistio = True
            self.save()
            return True
        return False

    def __str__(self):
        return f"Cita de {self.paciente} el {self.fecha_hora}"
    
