document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Deja de observar el elemento una vez que ha aparecido
            }
        });
    }, { threshold: 0.2 }); // Aplica la animación cuando el 20% del elemento es visible

    fadeElements.forEach(element => observer.observe(element));
});









document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchBar');
    const productCards = document.querySelectorAll('.card__trust');
    let products = [];

    // Recolectar los datos de los productos
    productCards.forEach(card => {
        products.push({
            id: card.getAttribute('data-product-id'),
            name: card.querySelector('h2').textContent.trim(),
            price: card.querySelector('.precio').textContent.trim(),
            element: card // Guardamos la referencia al elemento del DOM
        });
    });

    // Configurar Fuse.js
    const fuse = new Fuse(products, {
        keys: ['name'], // Buscar solo en el nombre
        threshold: 0.4, // Ajusta la tolerancia. Menor es más estricto, mayor es más permisivo
        distance: 100 // Ajusta la importancia de la posición de coincidencia en el texto
    });

    // Manejar la búsqueda
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();

        // Si no hay nada escrito, mostrar todos los productos
        if (!query) {
            productCards.forEach(card => card.style.display = 'block');
            return;
        }

        // Obtener los resultados de la búsqueda con Fuse.js
        const results = fuse.search(query);

        // Mostrar solo los productos que coinciden
        productCards.forEach(card => card.style.display = 'none'); // Ocultar todos los productos

        results.forEach(result => {
            result.item.element.style.display = 'block'; // Mostrar los productos coincidentes
        });
    });
});



// Configuración de la paginación
const productsPerPage = 9;
let currentPage = 1;

// Función para manejar la paginación automática
function paginateProducts() {
    const container = document.getElementById('product-container');
    const products = container.querySelectorAll('.card__trust'); // Contar productos
    const totalProducts = products.length;
    
    if (totalProducts <= productsPerPage) {
        // Si hay 9 productos o menos, no hacer nada
        return;
    }

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Mostrar solo los productos de la página actual
    function displayProducts(page) {
        const start = (page - 1) * productsPerPage;
        const end = page * productsPerPage;

        products.forEach((product, index) => {
            product.style.display = (index >= start && index < end) ? 'block' : 'none';
        });
    }

    // Crear los botones de paginación
    function createPagination() {
        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagination-btn');
            if (i === currentPage) {
                button.classList.add('active');
            }

            button.addEventListener('click', () => {
                currentPage = i;
                displayProducts(currentPage);
                document.querySelectorAll('.pagination-btn').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });

            paginationContainer.appendChild(button);
        }
    }

    // Mostrar la primera página y generar la paginación
    displayProducts(currentPage);
    createPagination();
}

// Esperar a que el DOM esté listo antes de ejecutar la función
document.addEventListener("DOMContentLoaded", paginateProducts);
