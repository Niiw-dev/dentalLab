function confirmarEliminacion(id, producto) {
    document.getElementById('elementoProducto').textContent = producto;
    const actionUrl = `/eliminarelementos/${id}/`;
    document.getElementById('formEliminar').action = actionUrl;
    document.getElementById('confirmarModal').style.display = ' flex';
}

function confirmarEliminacion2(id, nombre, documento) {
    const historiaNombreElement = document.getElementById('historiaNombre');
    const historiaDocumentoElement = document.getElementById('historiaDocumento');

    if (historiaNombreElement && historiaDocumentoElement) {
        historiaNombreElement.textContent = nombre;
        historiaDocumentoElement.textContent = documento;
    }

    const actionUrl = `/eliminarhistorias/${id}/`;
    const formEliminar = document.getElementById('formEliminar');
    if (formEliminar) {
        formEliminar.action = actionUrl;
    }

    const modal = document.getElementById('confirmarModal');
    if (modal) {
        modal.style.display = ' flex';
    }
}

function cerrarModal() {
    document.getElementById('confirmarModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('confirmarModal')) {
        cerrarModal();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const desactivarButtons = document.querySelectorAll('#desactivarCuenta');
    const activarButtons = document.querySelectorAll('#activarCuenta');

    const confirmModal = document.getElementById('confirmModal');
    const confirmModal2 = document.getElementById('confirmModal2');

    const closeButtons = document.querySelectorAll('.close');

    const confirmDesactivarButton = document.getElementById('confirmDesactivar');
    const confirmActivarButton = document.getElementById('confirmActivar');
    const cancelDesactivarButton = document.getElementById('cancelDesactivar');
    const cancelActivarButton = document.getElementById('cancelActivar');

    let userIdToModify;

    function showDesactivarModal(userId) {
        userIdToModify = userId;
        confirmModal.style.display = ' flex';
        confirmModal.style.height = 'fit-content';
    }

    function showActivarModal(userId) {
        userIdToModify = userId;
        confirmModal2.style.display = ' flex';
        confirmModal2.style.height = 'fit-content';
    }

    desactivarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.getAttribute('data-user-id');
            showDesactivarModal(userId);
        });
    });

    activarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.getAttribute('data-user-id');
            showActivarModal(userId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            confirmModal.style.display = 'none';
            confirmModal2.style.display = 'none';
        });
    });

    cancelDesactivarButton.addEventListener('click', function () {
        confirmModal.style.display = 'none';
    });

    cancelActivarButton.addEventListener('click', function () {
        confirmModal2.style.display = 'none';
    });

    confirmDesactivarButton.addEventListener('click', function () {
        desactivarCuenta(userIdToModify);
        confirmModal.style.display = 'none';
    });

    confirmActivarButton.addEventListener('click', function () {
        activarCuenta(userIdToModify);
        confirmModal2.style.display = 'none';
    });

    function desactivarCuenta(userId) {
        fetch(`/eliminar_cuenta/${userId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function activarCuenta(userId) {
        fetch(`/activar_cuenta/${userId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
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
