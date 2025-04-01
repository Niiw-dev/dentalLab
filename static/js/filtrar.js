document.addEventListener("DOMContentLoaded", function () {
    const filtroForm = document.getElementById("filtroForm");
    const fechaFiltro = document.getElementById("fechaFiltro");
    const motivoFiltro = document.getElementById("motivoFiltro");
    const estadoFiltro = document.getElementById("estadoFiltro");
    const tablaCitas = document.getElementById("elementosTable").getElementsByTagName('tbody')[0];

    document.getElementById('download-excel-btn').addEventListener('click', function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del enlace

    const data = {
        fecha: fechaFiltro.value,
        motivo: motivoFiltro.value,
        estado: estadoFiltro.value
    };

    // Realizar la solicitud POST con fetch
    fetch('/reporte-excel/', {
        method: 'POST',  // Usamos POST para enviar los datos en el cuerpo
        headers: {
            'Content-Type': 'application/json',  // Aseguramos que estamos enviando JSON
            'X-CSRFToken': getCookie('csrftoken')  // Incluimos el token CSRF para seguridad (si estás usando Django)
        },
        body: JSON.stringify(data)  // Convertimos el objeto de datos a formato JSON
    })
    .then(response => {
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Hubo un problema al generar el archivo Excel');
        }
        return response.blob();  // Devuelve el archivo como un Blob
    })
    .then(blob => {
        // Crea un enlace temporal para la descarga
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'Reporte_citas.xlsx';  // Nombre por defecto para la descarga
        downloadLink.click();  // Inicia la descarga

        // Limpia el objeto URL creado
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error al descargar el archivo:', error);
    });
});

    document.getElementById('download-pdf-btn').addEventListener('click', function(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del enlace

    const data = {
        fecha: fechaFiltro.value,
        motivo: motivoFiltro.value,
        estado: estadoFiltro.value
    };
        console.log(data)
    // Realizar la solicitud POST con fetch
    fetch('/reporte-pdf/', {
        method: 'POST',  // Usamos POST para enviar los datos en el cuerpo
        headers: {
            'Content-Type': 'application/json',  // Aseguramos que estamos enviando JSON
            'X-CSRFToken': getCookie('csrftoken')  // Incluimos el token CSRF para seguridad (si estás usando Django)
        },
        body: JSON.stringify(data)  // Convertimos el objeto de datos a formato JSON
    })
    .then(response => {
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Hubo un problema al generar el archivo Excel');
        }
        return response.blob();  // Devuelve el archivo como un Blob
    })
    .then(blob => {
        // Crea un enlace temporal para la descarga
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = 'Reporte_citas.pdf';  // Nombre por defecto para la descarga
        downloadLink.click();  // Inicia la descarga

        // Limpia el objeto URL creado
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error al descargar el archivo:', error);
    });
});


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

    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

});