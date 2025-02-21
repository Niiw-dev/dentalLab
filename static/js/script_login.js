const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const main = document.getElementById('main');
const container = document.querySelector('.container2');

function handleResize() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        container.style.transition = 'none';
        setTimeout(() => {
            container.style.transition = 'all 0.6s ease-in-out';
        }, 100);
    }
}

window.addEventListener('resize', handleResize);
handleResize();

signInButton.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        container.classList.remove("right-panel-active");
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        container.classList.remove("right-panel-active");
    }
});

signUpButton.addEventListener('click', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        container.classList.add("right-panel-active");
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        container.classList.add("right-panel-active");
    }
});