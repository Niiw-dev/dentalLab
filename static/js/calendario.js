document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var citasData = JSON.parse(document.getElementById('citas-data').textContent);
    var isSuperuser = document.getElementById('is-superuser').textContent === 'True';

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        height: '31rem',
        dayMaxEventRows: true,
        moreLinkText: "Ver más",
        eventBackgroundColor: 'white',  
        eventBorderColor: 'darkblue',   
        textColor: 'black',             
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
            var startDate = new Date(cita.start);
            var startTime = startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            
            var endDate = new Date(startDate.getTime() + 20 * 60000);
            var endTime = endDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            
            var motivo = cita.motivo.replace(/Protesis/gi, 'Prótesis').replace(/ortodoncia/gi, 'Ortodoncia');
            var title = `${cita.paciente}: ${motivo}`;
            
            return {
                title: title,
                start: cita.start,
                end: cita.end,
                backgroundColor: 'white',
                borderColor: 'darkblue',
                textColor: 'black',
            };
        }),
        eventContent: function(arg) {
            var startTime = arg.event.start.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

            return {
                html: `<div style="white-space: normal; overflow: visible; font-weight: bold; color: darkblue;">
                          ${startTime} - ${arg.event.title}
                       </div>`
            };
        },
        datesSet: function (dateInfo) {
            var headerSections = calendarEl.querySelectorAll('.fc-scroller');
            headerSections.forEach(function (section) {
                section.style.setProperty('--scrollbar-width', '11px');
                section.style.setProperty('--scrollbar-background-color', '#f0f0f0');
                section.style.setProperty('--scrollbar-thumb-background-color', '#3b3b3b');
                section.style.setProperty('--scrollbar-thumb-border', '3px solid #f0f0f0');
                section.style.setProperty('--scrollbar-track-background-color', '#e0e0e0');
                section.style.setProperty('--scrollbar-radius', '10px');
                section.style.setProperty('overflow', 'auto');
            });

            var dayHeaders = calendarEl.querySelectorAll('.fc-col-header-cell.fc-day');
            dayHeaders.forEach(function (dayHeader, index) {
                const dayShortNames = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                dayHeader.textContent = dayShortNames[index];
            });

            var titleElement = calendarEl.querySelector('.fc-toolbar-title');    
            if (titleElement) {        
                var currentDate = new Date(dateInfo.view.currentStart);
                
                var month = currentDate.toLocaleString('es-ES', { month: 'long' });
                var year = currentDate.getFullYear();
                
                titleElement.textContent = `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
            }
        },
    });

    calendar.render();
});