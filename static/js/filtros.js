function confirmarEliminacion(id, producto) {
    document.getElementById('elementoProducto').textContent = producto;
    const actionUrl = `/eliminarelementos/${id}/`;
    document.getElementById('formEliminar').action = actionUrl;
    document.getElementById('confirmarModal').style.display = 'block';
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
        modal.style.display = 'block';
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

    // Mostrar modal de desactivación
    function showDesactivarModal(userId) {
        userIdToModify = userId;
        confirmModal.style.display = 'block';
    }

    // Mostrar modal de activación
    function showActivarModal(userId) {
        userIdToModify = userId;
        confirmModal2.style.display = 'block';
    }

    // Mostrar el modal cuando se hace clic en los botones de desactivar
    desactivarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.getAttribute('data-user-id');
            showDesactivarModal(userId);
        });
    });

    // Mostrar el modal cuando se hace clic en los botones de activar
    activarButtons.forEach(button => {
        button.addEventListener('click', function () {
            const userId = this.getAttribute('data-user-id');
            showActivarModal(userId);
        });
    });

    // Cerrar modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            confirmModal.style.display = 'none';
            confirmModal2.style.display = 'none';
        });
    });

    // Cancelar desactivación
    cancelDesactivarButton.addEventListener('click', function () {
        confirmModal.style.display = 'none';
    });

    // Cancelar activación
    cancelActivarButton.addEventListener('click', function () {
        confirmModal2.style.display = 'none';
    });

    // Confirmar desactivación
    confirmDesactivarButton.addEventListener('click', function () {
        desactivarCuenta(userIdToModify);
        confirmModal.style.display = 'none';
    });

    // Confirmar activación
    confirmActivarButton.addEventListener('click', function () {
        activarCuenta(userIdToModify);
        confirmModal2.style.display = 'none';
    });

    // Función para desactivar cuenta (AJAX sin alert)
    function desactivarCuenta(userId) {
        fetch(`/desactivar_cuenta/${userId}/`, {
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
            console.error('Error:', error);  // No muestra alert, pero lo captura en la consola
        });
    }

    // Función para activar cuenta (AJAX sin alert)
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
            console.error('Error:', error);  // No muestra alert, pero lo captura en la consola
        });
    }

    // Función para obtener el token CSRF
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