$(document).ready(function () {
  const passwordInput = $('#new_password1');
  const confirmPasswordInput = $('#new_password2');
  const form = $('#password-reset-form');

  const requirements = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/
  };

  function validatePassword() {
    const password = passwordInput.val();
    let valid = true;

    for (const [requirement, regex] of Object.entries(requirements)) {
      const isValid = regex.test(password);
      $(`#${requirement}`).toggleClass('text-success', isValid).toggleClass('text-danger', !isValid);
      valid = valid && isValid;
    }

    return valid;
  }

  function validateConfirmPassword() {
    return passwordInput.val() === confirmPasswordInput.val();
  }

  passwordInput.on('input', validatePassword);
  confirmPasswordInput.on('input', validateConfirmPassword);

  form.on('submit', function (e) {
    e.preventDefault();

    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();

    $('#new_password1_errors').text(passwordValid ? '' : 'La contraseña no cumple con todos los requisitos.');
    $('#new_password2_errors').text(confirmPasswordValid ? '' : 'Las contraseñas no coinciden.');

    if (passwordValid && confirmPasswordValid) {
      this.submit();
    }
  });
  $('#togglePassword').on('click', function () {
    const passwordField = $('#new_password1');
    const passwordFieldType = passwordField.attr('type') === 'password' ? 'text' : 'password';
    passwordField.attr('type', passwordFieldType);
    $(this).find('i').toggleClass('fa-eye fa-eye-slash');
  });

  $('#toggleConfirmPassword').on('click', function () {
    const passwordField = $('#new_password2');
    const passwordFieldType = passwordField.attr('type') === 'password' ? 'text' : 'password';
    passwordField.attr('type', passwordFieldType);
    $(this).find('i').toggleClass('fa-eye fa-eye-slash');
  });
});


