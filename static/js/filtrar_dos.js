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