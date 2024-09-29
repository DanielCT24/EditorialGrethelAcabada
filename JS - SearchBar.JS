
             document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchBar');
    const productCards = document.querySelectorAll('.card__trust');
    let products = [];

    // Recolectar los datos de los productos
    productCards.forEach(card => {
        const productName = card.querySelector('h2')?.textContent.trim() || '';
        const productPrice = card.querySelector('.precio')?.textContent.trim() || '';

        if (productName) { // Asegurarnos de que el producto tiene un nombre válido
            products.push({
                id: card.getAttribute('data-product-id'),
                name: productName,
                price: productPrice,
                element: card
            });
        }
    });

    // Verificar que los productos fueron recolectados correctamente
    console.log('Productos recolectados:', products);

    if (products.length === 0) {
        console.error('No se encontraron productos. Verifica la estructura HTML.');
        return;
    }

    // Configurar Fuse.js
    const fuse = new Fuse(products, {
        keys: ['name'],
        threshold: 0.4,
        distance: 100
    });

    // Manejar la búsqueda
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim().toLowerCase(); // Convertimos la consulta a minúsculas

        // Mostrar todos los productos si no hay una consulta
        if (!query) {
            productCards.forEach(card => card.style.display = 'block');
            return;
        }

        // Obtener los resultados de la búsqueda con Fuse.js
        const results = fuse.search(query);

        // Ocultar todos los productos
        productCards.forEach(card => card.style.display = 'none');

        // Mostrar solo los productos que coinciden
        if (results.length > 0) {
            results.forEach(result => {
                result.item.element.style.display = 'block';
            });
        } else {
            console.log('No se encontraron coincidencias para:', query);
        }
    });
});
