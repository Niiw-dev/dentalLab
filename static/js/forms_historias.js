const button = document.querySelector('#button');

// Add event listener to the button
button.addEventListener('click', (event) => {
    event.preventDefault();

    // Validate each field
    validateEmpty(document.querySelector('#id_username').value, document.querySelector('#id_username'), document.querySelector('#usernameError'), 'nombre');
    validateEmail(document.querySelector('#id_email').value, document.querySelector('#id_email'), document.querySelector('#emailError'));
    validateEmpty(document.querySelector('#id_direccion').value, document.querySelector('#id_direccion'), document.querySelector('#direccionError'), 'Direccion');
    validateEmpty(document.querySelector('#id_edad').value, document.querySelector('#id_edad'), document.querySelector('#edadError'), 'Edad');
    validateEmpty(document.querySelector('#id_ocupacion').value, document.querySelector('#id_ocupacion'), document.querySelector('#ocupacionError'), 'Ocupacion');
    validateEmpty(document.querySelector('#id_celular').value, document.querySelector('#id_celular'), document.querySelector('#celularError'), 'Celular');
});

// Validation functions
function validateEmail(valueInput, divInput, divError) {
    let regExp = /[a-z0-9!#$%&'+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (regExp.test(valueInput) === true) {
        hideError(divInput, divError);
    } else {
        showError(divInput, divError, 'Parece que esto no es un correo electrónico.');
    }
}

function validateEmpty(valueInput, divInput, divError, nameInput) {
    if (valueInput.length === 0) {
        showError(divInput, divError, "${nameInput} no puede estar vacío.");
    } else {
        hideError(divInput, divError);
    }
}

function showError(divInput, divError, error) {
    divInput.style.border = '1px solid red';
    divError.innerHTML = `<img class="icon-error" src="./images/icon-error.svg" alt="">
    <p class="error">${error}</p>`;
}

function hideError(divInput, divError) {
    divInput.style.border = '1px solid hsl(246, 25%, 77%)';
    divError.innerHTML = ``;
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