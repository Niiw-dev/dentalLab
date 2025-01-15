document.addEventListener('DOMContentLoaded', function() {
    var abrirVentana = document.getElementById('abrirVentana');
    var cerrarVentana = document.getElementById('cerrarVentana');
    var ventanaInformativa = document.getElementById('ventanaInformativa');

    abrirVentana.addEventListener('click', function(e) {
        e.preventDefault(); // Previene el comportamiento predeterminado del enlace
        ventanaInformativa.style.display = 'block';
    });

    cerrarVentana.addEventListener('click', function() {
        ventanaInformativa.style.display = 'none';
    });
});

function openInNewTab(url) {
    var width = 600;
    var height = 400;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;

    window.open(url, '_blank', `toolbar=yes,scrollbars=yes,resizable=yes,top=${top},left=${left},width=${width},height=${height}`);
}
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Verifica si el modo oscuro está guardado en localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Cambiar a sol
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Cambiar a luna
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Cambiar el icono según el estado
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Mostrar sol
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Mostrar luna
        }
    });
});