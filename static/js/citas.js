document.addEventListener('DOMContentLoaded', function() {
    function cancelarCita(citaId) {
        if (confirm('¿Estás seguro de cancelar el agendamiento de esta cita?')) {
            const url = `/cancelar-cita/${citaId}/`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Ocurrió un error al cancelar la cita.');
                    });
                }
            })
            .then(data => {
                alert('Cita cancelada exitosamente.');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert(error.message);
            });
        }
    }

    function confirmarActualizacion(citaId) {
        if (confirm('¿Estás seguro de confirmar la actualización de esta cita?')) {
            const url = `/confirmar-actualizacion/${citaId}/`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Ocurrió un error al confirmar la actualización de la cita.');
                    });
                }
            })
            .then(data => {
                alert('Cita actualizada correctamente.');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert(error.message);
            });
        }
    }

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancelar-cita-btn')) {
            e.preventDefault();
            const citaId = e.target.dataset.citaId;
            cancelarCita(citaId);
        } else if (e.target.classList.contains('confirmar-actualizacion-btn')) {
            e.preventDefault();
            const citaId = e.target.dataset.citaId;
            confirmarActualizacion(citaId);
        }
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
