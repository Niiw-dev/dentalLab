document.addEventListener('DOMContentLoaded', function() {
    var deactivateModal = document.getElementById('confirmModal');
    var activateModal = document.getElementById('confirmModal2');
    var deactivateBtn = document.getElementById('desactivarCuenta');
    var activateBtn = document.getElementById('activarCuenta');
    var spans = document.getElementsByClassName('close');
    var confirmDeactivateBtn = document.getElementById('confirmDesactivar');
    var confirmActivateBtn = document.getElementById('confirmActivar');
    var cancelBtns = document.getElementsByClassName('btn-secondary');

    function showModal(modal) {
        modal.style.display = "block";
    }

    function hideModal(modal) {
        modal.style.display = "none";
    }

    function setupModalEvents(modal) {
        Array.from(spans).forEach(span => {
            span.onclick = function() {
                hideModal(modal);
            }
        });

        Array.from(cancelBtns).forEach(btn => {
            btn.onclick = function() {
                hideModal(modal);
            }
        });

        window.onclick = function(event) {
            if (event.target == modal) {
                hideModal(modal);
            }
        }
    }

    if (deactivateBtn) {
        deactivateBtn.onclick = function() {
            showModal(deactivateModal);
        }
    }

    if (activateBtn) {
        activateBtn.onclick = function() {
            showModal(activateModal);
        }
    }

    setupModalEvents(deactivateModal);
    setupModalEvents(activateModal);

    function handleAccountAction(action, btn, modal) {
        var userId = btn.getAttribute('data-user-id');
        fetch('/' + action + '_cuenta/' + userId + '/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    location.reload();
                }
            }
        })
        .catch(error => console.error('Error:', error));
        hideModal(modal);
    }

    if (confirmDeactivateBtn) {
        confirmDeactivateBtn.onclick = function() {
            handleAccountAction('eliminar', deactivateBtn, deactivateModal);
        }
    }

    if (confirmActivateBtn) {
        confirmActivateBtn.onclick = function() {
            handleAccountAction('activar', activateBtn, activateModal);
        }
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