from django import forms
from .models import UserProfile, Valoracion, Inventario, Fecha, Cita
from django.core.validators import MaxValueValidator
from PIL import Image



class UserForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['tipo', 'documento', 'nombre', 'imagen', 'correo', 'direccion', 'edad', 'ocupacion', 'celular', 'acudiente']

    tipo = forms.TypedChoiceField(
        choices=UserProfile.TIPO_CHOICES,
        coerce=int
    )

    def clean_imagen(self):
        imagen = self.cleaned_data.get('imagen')
        if imagen:
            try:
                # Abrir la imagen
                img = Image.open(imagen)
                # Verificar el formato
                if img.format.lower() not in ['jpeg', 'jpg', 'png', 'gif']:
                    raise forms.ValidationError("El formato de imagen no es soportado. Use JPEG, PNG o GIF.")
                # Verificar el tamaño (por ejemplo, menor a 5MB)
                if imagen.size > 5 * 1024 * 1024:
                    raise forms.ValidationError("La imagen es demasiado grande. El tamaño máximo es 5MB.")
                # Volver a colocar el puntero del archivo al inicio
                imagen.seek(0)
                return imagen
            except IOError:
                raise forms.ValidationError("No se pudo leer el archivo. Asegúrese de que es una imagen válida.")
        return imagen

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        self.fields['tipo'].required = False

class ValoracionForm(forms.ModelForm):
    class Meta:
        model = Valoracion
        exclude = ['user', 'nombre', 'documento']
        widgets = {
            'fecha_historia': forms.DateInput(attrs={'type': 'date'}), 
        }

class InventarioForm(forms.ModelForm):
    class Meta:
        model = Inventario
        fields = ['producto', 'cantidad', 'estado']

    estado = forms.ChoiceField(choices=Inventario.ESTADO)

from django.core.exceptions import ValidationError

class FechaForm(forms.ModelForm):
    hora_final = forms.TimeField(widget=forms.TimeInput(attrs={'type': 'time', 'required': 'required'}))

    class Meta:
        model = Fecha
        fields = ['fecha', 'hora', 'hora_final']

class CitaForm(forms.ModelForm):
    fecha = forms.DateField(widget=forms.DateInput(attrs={'type': 'date', 'required': 'required'}))  # Fecha obligatoria
    hora = forms.TimeField(widget=forms.TimeInput(attrs={'type': 'time', 'required': 'required'}))  # Hora obligatoria
    motivo = forms.ChoiceField(choices=Cita.MOTIVO_CHOICES)

    class Meta:
        model = Cita
        fields = ['fecha', 'hora', 'motivo', 'paciente']

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)

        if not self.user:
            raise ValueError('Se requiere un usuario para inicializar este formulario.')

        if not self.user.is_superuser:
            self.fields['paciente'] = forms.ModelChoiceField(
                queryset=UserProfile.objects.filter(documento=self.user.documento, is_active=True),
                required=False
            )

    def clean(self):
        cleaned_data = super().clean()
        paciente = cleaned_data.get('paciente')
        fecha = cleaned_data.get('fecha')
        hora = cleaned_data.get('hora')

        if paciente and not paciente.is_active:
            raise forms.ValidationError('El paciente seleccionado no está activo.')

        if not fecha:
            raise forms.ValidationError('La fecha es obligatoria.')

        if not hora:
            raise forms.ValidationError('La hora es obligatoria.')

        return cleaned_data

    def save(self, commit=True):
        cita = super().save(commit=False)
        fecha = self.cleaned_data['fecha']
        hora = self.cleaned_data['hora']

        # Obtener o crear la instancia de Fecha
        fecha_hora, created = Fecha.objects.get_or_create(fecha=fecha, hora=hora)

        # Asignar la instancia de Fecha a la cita
        cita.fecha_hora = fecha_hora

        if created:
            fecha_hora.disponible = False
            fecha_hora.save()

        if commit:
            cita.save()

        return cita

  

    