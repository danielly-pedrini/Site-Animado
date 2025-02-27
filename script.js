let list = document.querySelectorAll('.item');
let after = document.getElementById('after');
let before = document.getElementById('before');
let count = list.length;
let active = 0;
let isAnimating = false; // Evita cliques rápidos durante animações

// Função para trocar slides
function changeSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    let activeOld = document.querySelector('.active');
    activeOld.classList.remove('active');
    
    if (direction === 'next') {
        active = active >= count - 1 ? 0 : active + 1;
    } else {
        active = active <= 0 ? count - 1 : active - 1;
    }
    
    list[active].classList.add('active');
    
    // Permite nova animação após 600ms (duração da animação mais longa)
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

// Listeners de eventos
after.onclick = () => changeSlide('next');
before.onclick = () => changeSlide('prev');

// Adiciona navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        changeSlide('next');
    } else if (e.key === 'ArrowLeft') {
        changeSlide('prev');
    }
});

// Suporte para gestos de swipe em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50; // Distância mínima para considerar um swipe
    
    if (touchEndX < touchStartX - threshold) {
        // Swipe da direita para a esquerda (avançar)
        changeSlide('next');
    } else if (touchEndX > touchStartX + threshold) {
        // Swipe da esquerda para a direita (voltar)
        changeSlide('prev');
    }
}

// Inicialização
window.addEventListener('load', () => {
    // Garante que o primeiro slide esteja ativo ao carregar a página
    list[active].classList.add('active');
});