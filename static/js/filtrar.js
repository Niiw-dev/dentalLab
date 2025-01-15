document.addEventListener("DOMContentLoaded", function () {
    // Referencia al formulario y los elementos de filtro
    const filtroForm = document.getElementById("filtroForm");
    const fechaFiltro = document.getElementById("fechaFiltro");
    const motivoFiltro = document.getElementById("motivoFiltro");
    const estadoFiltro = document.getElementById("estadoFiltro");
    const tablaCitas = document.getElementById("elementosTable").getElementsByTagName('tbody')[0];

    // Escuchar cambios en los campos del formulario
    filtroForm.addEventListener("change", function () {
        aplicarFiltros();
    });

    function aplicarFiltros() {
        // Obtener los valores seleccionados
        const fecha = fechaFiltro.value;
        const motivo = motivoFiltro.value;
        const estado = estadoFiltro.value;

        // Crear la URL con los parámetros de búsqueda
        const params = new URLSearchParams({
            fecha: fecha,
            motivo: motivo,
            estado: estado
        });

        // Hacer la petición fetch con los parámetros
        fetch(`?${params.toString()}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',  // Para indicar que es una solicitud AJAX
            }
        })
        .then(response => response.json())  // Asumimos que la vista devuelve JSON
        .then(data => {
            actualizarTabla(data.citas);  // Actualizar la tabla con los nuevos datos
        })
        .catch(error => {
            console.error("Error al filtrar las citas:", error);
        });
    }

    function actualizarTabla(citas) {
        // Limpiar el contenido actual de la tabla
        tablaCitas.innerHTML = "";

        // Recorrer las citas y agregar filas a la tabla
        citas.forEach(cita => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${cita.paciente}</td>
                <td>${cita.nombres}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
                <td>${cita.motivo}</td>
                <td>${cita.estado}</td>
                <td class="no-print">
                    <a href="${cita.estado === 'Programada' ? `/editarcitas/${cita.id}/` : '#'}" class="${cita.estado === 'Programada' ? 'btn btn-warning' : 'btn btn-secondary disabled'}" data-tooltip="Editar detalles de la cita">
                        <i class="fas fa-pen sort-icon a"></i>
                    </a>

                    <button class="${cita.estado === 'Programada' ? 'btn btn-danger cancelar-cita-btn' : 'btn btn-secondary disabled'}" data-cita-id="${cita.id}" data-tooltip="Cancelar esta cita">
                        <i class="fas fa-trash sort-icon a"></i>
                    </button>
                    ${cita.is_superuser ? `<button class="${cita.estado === 'Programada' ? 'btn btn-success confirmar-actualizacion-btn' : 'btn btn-secondary disabled'}" data-cita-id="${cita.id}" data-tooltip="Marcar cita como completada"><i class="fas fa-check sort-icon a"></i></button>` : ''}
                </td>
            `;

            tablaCitas.appendChild(row);
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Verifica si el modo oscuro está guardado en localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        // Guarda la preferencia en localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});