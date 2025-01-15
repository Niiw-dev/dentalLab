document.addEventListener("DOMContentLoaded", function() {
    const filtroTipoDoc = document.getElementById("filtroTipoDoc");
    const filtroEstado = document.getElementById("filtroEstado");
    const pacientesRows = document.querySelectorAll(".paciente-row");

    filtroTipoDoc.addEventListener("change", filtrarTabla);
    filtroEstado.addEventListener("change", filtrarTabla);

    function filtrarTabla() {
        const tipoDocSeleccionado = filtroTipoDoc.value;
        const estadoSeleccionado = filtroEstado.value;

        pacientesRows.forEach(row => {
            const tipoDoc = row.getAttribute("data-tipodoc");
            const estado = row.getAttribute("data-estado");

            let mostrarFila = true;

            if (tipoDocSeleccionado && tipoDocSeleccionado !== tipoDoc) {
                mostrarFila = false;
            }

            if (estadoSeleccionado && estadoSeleccionado !== estado) {
                mostrarFila = false;
            }

            if (mostrarFila) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
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