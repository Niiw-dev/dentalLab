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
                horaContainer.innerHTML = '';
                
                horas.sort((a, b) => {
                    return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
                });
    
                let gridContainer = document.createElement('div');
                gridContainer.classList.add('cita-hora-grid');
                
                horas.forEach(hora => {
                    let button = document.createElement('button');
                    button.type = 'button';
                    button.classList.add('cita-hora-boton');
                    
                    const date = new Date('1970-01-01T' + hora + ':00');
                    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
                    const horaFormateada = date.toLocaleString('es-ES', options);
                    
                    const [time, ampm] = horaFormateada.split(' ');
                    button.innerHTML = `${time} <span class="ampm">${ampm}</span>`;
                    button.dataset.hora = hora;
                    
                    button.addEventListener('click', function() {
                        document.querySelectorAll('.cita-hora-boton').forEach(btn =>
                            btn.classList.remove('cita-hora-boton-seleccionado'));
                        this.classList.add('cita-hora-boton-seleccionado');
                        const horaSeleccionada = this.dataset.hora;
                        document.querySelector('input[name="hora"]').value = horaSeleccionada;
                    });
                    
                    gridContainer.appendChild(button);
                });
                
                
                horaContainer.appendChild(gridContainer);
                
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
    
    

    const fechaInicial = fechaInput.value;
    if (fechaInicial) {
        cargarHorasDisponibles(fechaInicial);
    }

    agregarEventListenersBotones();
});
