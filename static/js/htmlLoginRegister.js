document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            const isPassword = input.getAttribute('type') === 'password';

            input.setAttribute('type', isPassword ? 'text' : 'password');
            icon.classList.toggle('fa-eye', isPassword);
            icon.classList.toggle('fa-eye-slash', !isPassword);
        });
    });

    const registrationForm = document.querySelector('.sign-up .form');
    const acceptButton = document.getElementById('acceptTerms');
    const termsInput = document.createElement('input');
    const privacyInput = document.createElement('input');
    
    termsInput.type = 'hidden';
    termsInput.name = 'terms_accepted';
    termsInput.value = 'false';
    privacyInput.type = 'hidden';
    privacyInput.name = 'privacy_accepted';
    privacyInput.value = 'false';

    registrationForm.appendChild(termsInput);
    registrationForm.appendChild(privacyInput);

    const privacyCheck = document.getElementById('privacyCheck');
    const termsCheck = document.getElementById('termsCheck');

    function updateAcceptButton() {
        acceptButton.disabled = !(privacyCheck.checked && termsCheck.checked);
    }

    privacyCheck.addEventListener('change', updateAcceptButton);
    termsCheck.addEventListener('change', updateAcceptButton);

    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        new bootstrap.Modal(document.getElementById('termsModal')).show();
    });

    acceptButton.addEventListener('click', function () {
        termsInput.value = 'true';
        privacyInput.value = 'true';

        const modal = bootstrap.Modal.getInstance(document.getElementById('termsModal'));
        modal.hide();
        registrationForm.submit();
    });
});
