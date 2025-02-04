document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var citasData = JSON.parse(document.getElementById('citas-data').textContent);
    var isSuperuser = document.getElementById('is-superuser').textContent === 'True';

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: '',
            center: 'title',
            right: ''
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
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
                const dayShortNames = ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'];
                dayHeader.textContent = dayShortNames[index];
            });

            var titleElement = calendarEl.querySelector('.fc-toolbar-title');
            if (titleElement) {
                var currentMonth = new Date(dateInfo.view.currentStart).toLocaleString('es-ES', { month: 'long' });
                titleElement.textContent = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
            }

            var currentMonthStart = new Date(dateInfo.view.currentStart).toISOString().slice(0, 7); // 'YYYY-MM'
            var citasDelMes = citasData.filter(function (cita) {
                return cita.start.slice(0, 7) === currentMonthStart;
            });

            var citasContainer = document.querySelector('.citas');
            var noCitasMessage = citasContainer.querySelector('.no-citas-message');
            if (!citasDelMes.length) {
                if (!noCitasMessage) {
                    var message = document.createElement('p');
                    message.classList.add('no-citas-message');
                    message.textContent = 'No hay citas agendadas para este mes.';
                    citasContainer.appendChild(message);
                }
            } else {
                if (noCitasMessage) {
                    noCitasMessage.remove();
                }
            }
        },
    });

    calendar.render();
});
