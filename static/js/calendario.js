document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var citasData = JSON.parse(document.getElementById('citas-data').textContent);
    var isSuperuser = document.getElementById('is-superuser').textContent === 'True';

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',  // Configura el idioma a español
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },
        events: citasData.map(function(cita) {
            // Formatear la hora de inicio
            var startDate = new Date(cita.start);
            var startTime = startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            
            // Calcular la hora de finalización (20 minutos más tarde)
            var endDate = new Date(startDate.getTime() + 20 * 60000);
            var endTime = endDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            
            // Asegura la ortografía correcta y capitalización de "ortodoncia"
            var motivo = cita.motivo.replace(/Protesis/gi, 'Prótesis').replace(/ortodoncia/gi, 'Ortodoncia');
            var title = `${cita.paciente}: ${motivo}`;
            
            return {
                title: title,
                start: cita.start,
                end: cita.end,
                backgroundColor: 'black', // Cambiado a negro
                borderColor: 'darkblue',
                textColor: 'white',
                extendedProps: {
                    hora: `<strong>${title}<br>${startTime} - ${endTime}</strong>` // Todo en negrita
                }
            };
        }),
        eventDidMount: function(info) {
            // Mostrar la hora en el cuadro del evento
            info.el.innerHTML = info.event.extendedProps.hora;
        },
        datesset: function(dateInfo) {    // Ajustar el t%C3%ADtulo para que muestre el mes correcto     
            var titleElement = calendarEl.querySelector('.fc-toolbar-title');    
            if (titleElement) {        
                // Aseg%C3%BArate de obtener el primer d%C3%ADa del mes actual        
                var currentMonth = new Date(dateInfo.view.currentStart).toLocaleString('es-ES', { month: 'long', year: 'numeric' });        
                titleElement.textContent = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);    
            }
        }
    });

    calendar.render();
});