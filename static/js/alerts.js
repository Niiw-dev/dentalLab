document.addEventListener('DOMContentLoaded', function() {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
        const messages = messageContainer.getElementsByClassName('message');
        
        for (let message of messages) {
            const type = message.dataset.type;
            const content = message.dataset.content;
            
            let icon, title;
            switch(type) {
                case 'success':
                    icon = 'success';
                    title = '¡Éxito!';
                    break;
                case 'error':
                    icon = 'error';
                    title = 'Error';
                    break;
                case 'warning':
                    icon = 'warning';
                    title = 'Advertencia';
                    break;
                default:
                    icon = 'info';
                    title = 'Información';
            }

            Swal.fire({
                icon: icon,
                title: title,
                text: content,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
        }
    }
});
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
