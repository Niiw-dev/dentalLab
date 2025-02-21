document.addEventListener('DOMContentLoaded', function () {
    const table = document.getElementById('elementosTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const filtroEstados = document.getElementById('filtroEstados');

    function filtrarFilas() {
        const estadoSeleccionado = filtroEstados.value;

        rows.forEach(row => {
            const estadoCell = row.querySelector('td[data-sort="estado"]');
            const mostrarFila = estadoSeleccionado === '' ||
                (estadoSeleccionado === '1' && estadoCell.textContent === 'Disponible') ||
                (estadoSeleccionado === '2' && estadoCell.textContent === 'Agotado');

            row.style.display = mostrarFila ? '' : 'none';
        });
    }

    function ordenarFilas(columna, orden) {
        const sortedRows = rows.sort((a, b) => {
            const aValue = a.querySelector(`td[data-sort="${columna}"]`).textContent.trim();
            const bValue = b.querySelector(`td[data-sort="${columna}"]`).textContent.trim();

            if (columna === 'cantidad') {
                return orden === 'asc' ?
                    parseInt(aValue) - parseInt(bValue) :
                    parseInt(bValue) - parseInt(aValue);
            } else {
                return orden === 'asc' ?
                    aValue.localeCompare(bValue) :
                    bValue.localeCompare(aValue);
            }
        });

        tbody.innerHTML = '';
        sortedRows.forEach(row => tbody.appendChild(row));
    }

    filtroEstados.addEventListener('change', filtrarFilas);

    const headers = table.querySelectorAll('th[data-sort]');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const columna = header.getAttribute('data-sort');
            const ordenActual = header.getAttribute('data-order') || 'asc';
            const nuevoOrden = ordenActual === 'asc' ? 'desc' : 'asc';

            headers.forEach(h => h.removeAttribute('data-order'));
            header.setAttribute('data-order', nuevoOrden);

            ordenarFilas(columna, nuevoOrden);
        });
    });

    filtrarFilas();
});