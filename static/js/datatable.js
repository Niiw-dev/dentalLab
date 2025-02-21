$(document).ready(function () {
    var table = $('#elementosTable').DataTable({
        "destroy": true,
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron registros",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar:",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "emptyTable": "No hay datos disponibles en la tabla"
        },
        
        dom: '<"top"<"row align-items-center"<"col-sm-6"l><"col-sm-6"f>>><"clear"><"tableContainer"t><"bottom"<"row"<"col-sm-6"i><"col-sm-6 d-flex justify-content-end"p>>>',
        buttons: []
    });

    $('.dataTables_filter input').addClass('form-control').css({
        'width': '300px',
        'display': 'inline-block',
        'margin-left': '10px'
    });
    
    $('.dataTables_length').css({
        'display': 'flex',
        'align-items': 'center',
        'height': '100%'
    });
    
    $('.dataTables_length select').addClass('form-control form-control-sm').css({
        'width': 'auto',
        'margin-left': '5px',
        'margin-right': '5px'
    });
    
    $('<div class="spacer" style="margin-top: 10px;"></div>').insertAfter('.top');

    $('.bottom').css('margin-top', '5px');

    $('.bottom .row').css({
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between'
    });

    $('.dataTables_info, .dataTables_paginate').css({
        'padding': '0',
        'margin': '0'
    });

    $('.dataTables_info').css({
        'text-align': 'left'
    });

    $('.dataTables_paginate').css({
        'text-align': 'right'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let profileDropdownList = document.querySelector(".navbar-list");
    let btn = document.querySelector(".profile-dropdown-btn");

    if (profileDropdownList && btn) {
        const toggle = () => profileDropdownList.classList.toggle("active");

        btn.addEventListener("click", toggle);

        window.addEventListener("click", function(e) {
            if (!btn.contains(e.target)) profileDropdownList.classList.remove("active");
        });
    } else {
        console.error("Elementos no encontrados: .navbar-list o .profile-dropdown-btn");
    }
});
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var citasData = JSON.parse(document.getElementById('citas-data').textContent);
    var isSuperuser = document.getElementById('is-superuser').textContent === 'True';

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
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
                backgroundColor: 'black',
                borderColor: 'darkblue',
                textColor: 'white',
                extendedProps: {
                    hora: `<strong>${title}<br>${startTime} - ${endTime}</strong>`
                }
            };
        }),
        eventDidMount: function(info) {
            info.el.innerHTML = info.event.extendedProps.hora;
        },
        datesset: function(dateInfo) {
            var titleElement = calendarEl.querySelector('.fc-toolbar-title');
            if (titleElement) {        
                var currentMonth = new Date(dateInfo.view.currentStart).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
                titleElement.textContent = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);    
            }
        }
    });

    calendar.render();
});