document.addEventListener('DOMContentLoaded', function() {
    function confirmarEliminacion(id) {
        const actionUrl = `/eliminarfechas/${id}/`;
        document.getElementById('formEliminar').action = actionUrl;
        document.getElementById('confirmarModal').style.display = 'block';
    }

    function cerrarModal() {
        document.getElementById('confirmarModal').style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == document.getElementById('confirmarModal')) {
            cerrarModal();
        }
    }

    const eliminarButtons = document.querySelectorAll('.eliminar-btn');
    eliminarButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.dataset.id;
            confirmarEliminacion(id);
        });
    });

    function establecerFechaMinima() {
        const fechaInput = document.querySelector('input[name="fecha"]');
        if (fechaInput) {
            const today = new Date();
            const year = today.getFullYear();
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + today.getDate()).slice(-2);
            const minDate = `${year}-${month}-${day}`;
            fechaInput.setAttribute('min', minDate);
        }
    }

    establecerFechaMinima();

    const morningStart = "07:00";
    const morningEnd = "12:00";
    const afternoonStart = "14:00";
    const afternoonEnd = "17:00";

    function isTimeInAllowedRanges(time) {
        return (time >= morningStart && time <= morningEnd) || 
               (time >= afternoonStart && time <= afternoonEnd);
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const horaInput = document.querySelector('input[name="hora"]');
            const horaFinalInput = document.querySelector('input[name="hora_final"]');
            
            if (horaInput && horaFinalInput) {
                const selectedTime = horaInput.value;
                const selectedEndTime = horaFinalInput.value;

                if (!isTimeInAllowedRanges(selectedTime) || !isTimeInAllowedRanges(selectedEndTime)) {
                    e.preventDefault();
                    Swal.fire({
                        icon: 'error',
                        title: 'Hora no permitida',
                        text: 'Las horas seleccionadas deben estar entre 7:00 AM - 12:00 PM o 2:00 PM - 5:00 PM.'
                    });
                } 
            }
        });
    }

    const timeInputs = document.querySelectorAll('input[type="time"]');
    timeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (!isTimeInAllowedRanges(this.value)) {
                this.setCustomValidity('La hora debe estar entre 7:00 AM - 12:00 PM o 2:00 PM - 5:00 PM.');
            } else {
                this.setCustomValidity('');
            }
        });
    });
});
