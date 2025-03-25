document.addEventListener("DOMContentLoaded", function () {
    const filtroForm = document.getElementById("filtroForm");
    const fechaFiltro = document.getElementById("fechaFiltro");
    const motivoFiltro = document.getElementById("motivoFiltro");
    const estadoFiltro = document.getElementById("estadoFiltro");
    const tablaCitas = document.getElementById("elementosTable").getElementsByTagName('tbody')[0];

    filtroForm.addEventListener("change", function () {
        aplicarFiltros();
    });

    function aplicarFiltros() {
        const fecha = fechaFiltro.value;
        const motivo = motivoFiltro.value;
        const estado = estadoFiltro.value;

        const params = new URLSearchParams({
            fecha: fecha,
            motivo: motivo,
            estado: estado
        });

        fetch(`?${params.toString()}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        })
        .then(response => response.json())
        .then(data => {
            actualizarTabla(data.citas);
        })
        .catch(error => {
            console.error("Error al filtrar las citas:", error);
        });
    }

    function actualizarTabla(citas) {
        tablaCitas.innerHTML = "";

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
                    <a href="${cita.estado === 'Programada' ? `/editarcitas/${cita.id}/` : '#'}" class="${cita.estado === 'Programada' ? 'btn btn-info' : 'btn btn-secondary disabled'}" data-tooltip="Editar detalles de la cita">
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