$(document).ready(function() {
    function confirmarEliminacion() {
        $('#deleteModal').modal('show');
    }

    function eliminarCuenta() {
        var password = $('#password').val();
        $.ajax({
            type: 'POST',
            url: '{% url 'eliminar_cuenta' user.id %}',
            data: {
                password: password,
                csrfmiddlewaretoken: '{{ csrf_token }}'
            },
            success: function () {
                // Si la eliminación es exitosa, redirige al usuario a la página de inicio de sesión
                window.location.href = '{% url 'loginregister' %}';
            },
            error: function (xhr, status, error) {
                // Maneja los errores de eliminación de cuenta
                if (xhr.status === 403) {
                    alert('La contraseña ingresada no es correcta.');
                } else {
                    alert('Ocurrió un error al eliminar la cuenta. Por favor, inténtalo de nuevo más tarde.');
                }
            }
        });
    }

    // Evento de clic en el botón de "Eliminar Cuenta"
    $('a.btn-danger').click(function(event) {
        event.preventDefault();
        confirmarEliminacion();
    });

    // Evento de envío del formulario de eliminación de cuenta
    $('#deleteModal form').submit(function(event) {
        event.preventDefault();
        eliminarCuenta();
    });
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