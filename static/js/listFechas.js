function confirmarEliminacion(id, fechaHora) {
    const modal = document.getElementById('confirmarModal');
    modal.style.display = 'flex';

    document.getElementById('elementoProducto').innerText = fechaHora;
    const formEliminar = document.getElementById('formEliminar');
    formEliminar.action = `/eliminarfechas/${id}/`;
}

function cerrarModal() {
    const modal = document.getElementById('confirmarModal');
    modal.style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('confirmarModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('fechaFiltro').addEventListener('change', function () {
    document.getElementById('filtroForm').submit();
});