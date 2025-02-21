function confirmarEliminacion(id, fechaHora) {
    const modal = document.getElementById('confirmarModal');
    modal.style.display = 'block';

    document.getElementById('elementoProducto').innerText = fechaHora;

    const formEliminar = document.getElementById('formEliminar');
    formEliminar.action = "{% url 'eliminarfechas' 0 %}".replace('0', id);
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