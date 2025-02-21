$(document).ready(function() {
    function confirmarEliminacion() {
        $('#deleteModal').modal('show');
    }

    function eliminarCuenta() {
        var password = $('#password').val();
        $.ajax({
            type: 'POST',
            url: "{% url 'eliminar_cuenta' user.id %}",
            data: {
                password: password,
                csrfmiddlewaretoken: '{{ csrf_token }}'
            },
            success: function () {
                window.location.href = "{% url 'loginregister' %}";
            },
            error: function (xhr, status, error) {
                if (xhr.status === 403) {
                    alert('La contraseña ingresada no es correcta.');
                } else {
                    alert('Ocurrió un error al eliminar la cuenta. Por favor, inténtalo de nuevo más tarde.');
                }
            }
        });
    }

    $('a.btn-danger').click(function(event) {
        event.preventDefault();
        confirmarEliminacion();
    });

    $('#deleteModal form').submit(function(event) {
        event.preventDefault();
        eliminarCuenta();
    });
});