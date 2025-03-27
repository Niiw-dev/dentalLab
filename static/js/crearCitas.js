document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');
    const horaContainer = document.getElementById('hora');

    flatpickr(fechaInput, {
        dateFormat: "Y-m-d",
        minDate: "today",
        inline: true,
        static: true,
        locale: "es",
        onChange: function (selectedDates, dateStr, instance) {
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
                    const options = {hour: 'numeric', minute: 'numeric', hour12: true};
                    const horaFormateada = date.toLocaleString('es-ES', options);

                    const [time, ampm] = horaFormateada.split(' ');
                    button.innerHTML = `${time} <span class="ampm">${ampm}</span>`;
                    button.dataset.hora = hora;

                    button.addEventListener('click', function () {
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
});