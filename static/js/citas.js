document.addEventListener('DOMContentLoaded', function() {
    function cancelarCita(citaId) {
        if (confirm('¿Estás seguro de cancelar el agendamiento de esta cita?')) {
            const url = `/cancelar-cita/${citaId}/`;
            console.log(getCookie('csrftoken'));
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Ocurrió un error al cancelar la cita.');
                    });
                }
            })
            .then(data => {
                alert('Cita cancelada exitosamente.');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert(error.message);
            });
        }
    }

    function confirmarActualizacion(citaId) {
        if (confirm('¿Estás seguro de confirmar la actualización de esta cita?')) {
            const url = `/confirmar-actualizacion/${citaId}/`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Ocurrió un error al confirmar la actualización de la cita.');
                    });
                }
            })
            .then(data => {
                alert('Cita actualizada correctamente.');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert(error.message);
            });
        }
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancelar-cita-btn')) {
            e.preventDefault();
            const citaId = e.target.dataset.citaId;
            cancelarCita(citaId);
        } else if (e.target.classList.contains('confirmar-actualizacion-btn')) {
            e.preventDefault();
            const citaId = e.target.dataset.citaId;
            confirmarActualizacion(citaId);
        }
    });

    const cancelButtons = document.querySelectorAll('.cancelar-cita-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const citaId = this.dataset.citaId;
            cancelarCita(citaId);
        });
    });

    // Event listener para botones de confirmar actualización
    const confirmButtons = document.querySelectorAll('.confirmar-actualizacion-btn');
    confirmButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const citaId = this.dataset.citaId;
            confirmarActualizacion(citaId);
        });
    });
    

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    

    const fechaInput = document.getElementById('fecha');
    const horaContainer = document.getElementById('hora');

    // Inicializar Flatpickr para el input de fecha
    flatpickr(fechaInput, {
        dateFormat: "Y-m-d",
        minDate: "today",
        inline: true,
        static: true,
        locale: "es",
        onChange: function(selectedDates, dateStr, instance) {
            const fechaValida = selectedDates.length > 0;

            if (fechaValida) {
                cargarHorasDisponibles(dateStr);
            } else {
                horaContainer.innerHTML = '';
            }
        }
    });

    function cargarHorasDisponibles(fechaSeleccionada) {
        fetch(`/get-horas-disponibles/?fecha=${fechaSeleccionada}`)
            .then(response => response.json())
            .then(horas => {
                horaContainer.innerHTML = '';  // Limpiar opciones actuales
                
                // Ordenar las horas de más temprana a más tardía
                horas.sort((a, b) => {
                    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                });
    
                // Crear el contenedor grid
                let gridContainer = document.createElement('div');
                gridContainer.classList.add('cita-hora-grid');
                
                horas.forEach(hora => {
                    let button = document.createElement('button');
                    button.type = 'button';
                    button.classList.add('cita-hora-boton');
                    
                    // Formatear la hora a AM/PM
                    const date = new Date('1970-01-01T' + hora + ':00');
                    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
                    const horaFormateada = date.toLocaleString('es-ES', options);
                    
                    // Separar la hora y el AM/PM
                    const [time, ampm] = horaFormateada.split(' ');
                    button.innerHTML = `${time} <span class="ampm">${ampm}</span>`; // Usar <span> para el AM/PM
                    button.dataset.hora = hora;
                    
                    button.addEventListener('click', function() {
                        // Deseleccionar todos los botones
                        document.querySelectorAll('.cita-hora-boton').forEach(btn => 
                            btn.classList.remove('cita-hora-boton-seleccionado'));
                        // Seleccionar este botón
                        this.classList.add('cita-hora-boton-seleccionado');
                        // Actualizar un campo oculto con la hora seleccionada
                        const horaSeleccionada = this.dataset.hora;
                        document.querySelector('input[name="hora"]').value = horaSeleccionada; // Guardar la hora en el campo oculto
                    });
                    
                    gridContainer.appendChild(button);
                });
                
                
                horaContainer.appendChild(gridContainer);
                
                // Agregar un campo oculto para almacenar la hora seleccionada
                let hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'hora';
                hiddenInput.required = true;
                horaContainer.appendChild(hiddenInput);
            })
            .catch(error => {
                console.error('Error al obtener horas disponibles:', error);
                alert('Ocurrió un error al obtener las horas disponibles.');
            });
    }
    
    

    // Cargar las horas disponibles inicialmente si hay una fecha seleccionada al inicio
    const fechaInicial = fechaInput.value;
    if (fechaInicial) {
        cargarHorasDisponibles(fechaInicial);
    }

    // Inicializar los event listeners de los botones
    agregarEventListenersBotones();
});
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Verifica si el modo oscuro está guardado en localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambiar a sol
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Cambiar a luna
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Cambiar el icono según el estado
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Mostrar sol
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Mostrar luna
        }
    });
});