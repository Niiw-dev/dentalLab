function confirmarEliminacion(id, producto) {
    console.log(`Confirmar eliminación de producto: ${producto}, ID: ${id}`);
    document.getElementById('elementoProducto').textContent = producto;
    const actionUrl = `/eliminarelementos/${id}/`;
    document.getElementById('formEliminar').action = actionUrl;
    document.getElementById('confirmarModal').style.display = ' flex';
}

function confirmarEliminacion2(id, nombre, documento) {
    console.log(`Confirmar eliminación de historia: Nombre: ${nombre}, Documento: ${documento}, ID: ${id}`);
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
    console.log('Cerrar modal');
    document.getElementById('confirmarModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('confirmarModal')) {
        console.log('Haciendo clic fuera del modal, cerrando...');
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
        console.log(`Mostrar modal de desactivación para el usuario con ID: ${userId}`);
        userIdToModify = userId;
        confirmModal.style.display = ' flex';
        confirmModal.style.height = 'fit-content';
    }

    function showActivarModal(userId) {
        console.log(`Mostrar modal de activación para el usuario con ID: ${userId}`);
        userIdToModify = userId;
        confirmModal2.style.display = ' flex';
        confirmModal2.style.height = 'fit-content';
    }

    desactivarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.getAttribute('data-user-id');
            console.log(`Se seleccionó desactivar cuenta para el usuario con ID: ${userId}`);
            showDesactivarModal(userId);
        });
    });

    activarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.getAttribute('data-user-id');
            console.log(`Se seleccionó activar cuenta para el usuario con ID: ${userId}`);
            showActivarModal(userId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Cerrar modales');
            confirmModal.style.display = 'none';
            confirmModal2.style.display = 'none';
        });
    });

    cancelDesactivarButton.addEventListener('click', function () {
        console.log('Cancelar desactivación');
        confirmModal.style.display = 'none';
    });

    cancelActivarButton.addEventListener('click', function () {
        console.log('Cancelar activación');
        confirmModal2.style.display = 'none';
    });

    confirmDesactivarButton.addEventListener('click', function () {
        console.log(`Confirmada desactivación para el usuario con ID: ${userIdToModify}`);
        desactivarCuenta(userIdToModify);
        confirmModal.style.display = 'none';
    });

    confirmActivarButton.addEventListener('click', function () {
        console.log(`Confirmada activación para el usuario con ID: ${userIdToModify}`);
        activarCuenta(userIdToModify);
        confirmModal2.style.display = 'none';
    });

    function desactivarCuenta(userId) {
        console.log(`Desactivando cuenta para el usuario con ID: ${userId}`);
        fetch(`/eliminar_cuenta/${userId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                console.log(`Cuenta desactivada con éxito para el usuario con ID: ${userId}`);
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function activarCuenta(userId) {
        console.log(`Activando cuenta para el usuario con ID: ${userId}`);
        fetch(`/activar_cuenta/${userId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.ok) {
                console.log(`Cuenta activada con éxito para el usuario con ID: ${userId}`);
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
