const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-track > .card__trust'); // Selecciona todas las tarjetas

let isScrolling = false;
const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight); // Ajusta según el ancho de las tarjetas y el margen
const scrollAmount = cardWidth; // Ajusta este valor según el ancho de tus tarjetas

function scrollCarousel(direction) {
  if (isScrolling) return;
  isScrolling = true;

  const transformValue = direction === 'next' ? -scrollAmount : scrollAmount;
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(${transformValue}px)`;

  setTimeout(() => {
    track.style.transition = 'none'; // Sin transición para reinicio inmediato
    track.style.transform = `translateX(${transformValue}px)`;

    if (direction === 'next') {
      track.appendChild(track.firstElementChild); // Mueve el primer elemento al final
    } else {
      track.insertBefore(track.lastElementChild, track.firstElementChild); // Mueve el último elemento al principio
    }

    // Ajusta el transform para que el primer o último elemento esté en su posición original
    track.style.transform = 'translateX(0)';
    isScrolling = false;
  }, 500); // Tiempo igual a la duración de la transición
}

// Función para avanzar automáticamente
function autoScroll() {
  scrollCarousel('next');
}

// Configuración del intervalo automático
let autoScrollInterval = setInterval(autoScroll, 4000); // Desplazamiento cada 4 segundos

// Eventos de los botones
nextBtn.addEventListener('click', () => {
  clearInterval(autoScrollInterval); // Detiene el desplazamiento automático
  scrollCarousel('next');
  autoScrollInterval = setInterval(autoScroll, 4000); // Reinicia el intervalo
});

prevBtn.addEventListener('click', () => {
  clearInterval(autoScrollInterval); // Detiene el desplazamiento automático
  scrollCarousel('prev');
  autoScrollInterval = setInterval(autoScroll, 4000); // Reinicia el intervalo
});

// Deslizamiento táctil
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  if (touchEndX < touchStartX) {
    // Deslizar a la izquierda
    scrollCarousel('next');
  }
  if (touchEndX > touchStartX) {
    // Deslizar a la derecha
    scrollCarousel('prev');
  }
}

track.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

// Ajuste al cambiar tamaño de ventana
window.addEventListener('resize', () => {
  // Ajusta según el nuevo tamaño de ventana si es necesario
});
