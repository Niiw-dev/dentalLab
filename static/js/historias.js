document.addEventListener('DOMContentLoaded', function() {
    const documentoInput = document.getElementById('id_documento');
    if (documentoInput) {
        documentoInput.addEventListener('change', function() {
            var documento = this.value;
            fetch(`/fetch-user-details/?documento=${documento}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.nombre) {
                    document.getElementById('id_tipo').value = data.tipo;
                    document.getElementById('id_nombre').value = data.nombre;
                    document.getElementById('id_correo').value = data.correo;
                    document.getElementById('id_direccion').value = data.direccion;
                    document.getElementById('id_edad').value = data.edad;
                    document.getElementById('id_ocupacion').value = data.ocupacion;
                    document.getElementById('id_celular').value = data.celular;
                    document.getElementById('id_acudiente').value = data.acudiente;
                } else {
                    alert("Usuario no encontrado.");
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});

function confirmarEliminacion(id, nombre, documento) {
    document.getElementById('historiaNombre').textContent = nombre;
    document.getElementById('historiaDocumento').textContent = documento;
    const actionUrl = `/eliminarhistorias/${id}/`;
    document.getElementById('formEliminar').action = actionUrl;
    document.getElementById('confirmarModal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('confirmarModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('confirmarModal')) {
        cerrarModal();
    }
}
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
