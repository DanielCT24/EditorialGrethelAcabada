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




/* ---------------------------------CARRITO-------------------------- */

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsElement = document.getElementById('cartItems');
    const totalPriceElem = document.getElementById('totalPrice');
    const cartCountElem = document.querySelector('.cart-count'); // Selecciona el contador en la barra lateral
    const cartCountHeaderElem = document.querySelector('.cart-count-header'); // Selecciona el contador en el encabezado
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        let total = 0;
        let totalItems = 0;

        // Limpiar los elementos existentes
        cartItemsElement.innerHTML = '';

        // Agregar cada producto al carrito
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <div class="cart-item-image-wrapper">
                    <div class="cart-item-image-container">
                        <button class="remove-item" data-id="${item.id}">&times;</button>
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                </div>
                <div class="cart-item-details-container">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="price">S/ ${item.price}</p>
                        <label for="quantity-${item.id}">Cantidad:</label>
                        <input type="number" id="quantity-${item.id}" class="quantity-input" value="${item.quantity}" min="1">
                    </div>
                </div>
            `;
            cartItemsElement.appendChild(itemElement);

            // Calcular el precio total y la cantidad de productos
            total += item.price * item.quantity;
            totalItems += item.quantity;
        });

        // Mostrar el total
        totalPriceElem.textContent = `Total: S/ ${total.toFixed(2)}`;

        // Actualizar el número de productos en el contador del carrito (barra lateral)
        cartCountElem.textContent = totalItems;

        // Actualizar el número de productos en el ícono del carrito del encabezado
        cartCountHeaderElem.textContent = totalItems;

        // Verificar si el número de productos excede el límite para el desplazamiento
        if (cart.length >= 5) {
            cartItemsElement.classList.add('scrolling');
        } else {
            cartItemsElement.classList.remove('scrolling');
        }
    }

    function addToCart(product, button) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += product.quantity;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage

        // Agregar la animación al botón "Añadir al carrito"
        button.classList.add('added-animation');

        // Eliminar la clase de animación después de la animación
        setTimeout(() => {
            button.classList.remove('added-animation');
        }, 700); // Duración de la animación

        updateCart();
    }

    // Añadir productos al carrito
    document.querySelectorAll('.btn__add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.card__trust');
            const productId = productElement.getAttribute('data-product-id');
            const productName = productElement.querySelector('h2').textContent;
            const productPrice = parseFloat(productElement.querySelector('.precio').textContent.replace('S/ ', ''));
            const productImage = productElement.querySelector('img').src;

            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            }, this);

            document.getElementById('sidebar').classList.add('open');
        });
    });

    // Actualizar la cantidad de productos en el carrito
    cartItemsElement.addEventListener('input', function(event) {
        if (event.target.classList.contains('quantity-input')) {
            const productId = event.target.id.split('-')[1];
            const newQuantity = parseInt(event.target.value, 10);

            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
                updateCart();
            }
        }
    });

    // Eliminar producto del carrito con animación
    cartItemsElement.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.getAttribute('data-id');
            const itemElement = event.target.closest('.cart-item');

            // Agregar clase de animación para el fade out
            itemElement.classList.add('fade-out');

            // Esperar a que termine la animación antes de eliminar el elemento
            setTimeout(() => {
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar en localStorage
                updateCart();
            }, 500); // Tiempo en milisegundos para la animación
        }
    });

    // Cerrar la barra lateral
    document.getElementById('closeSidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('open');
    });

    // Asignar evento al botón "Vaciar Carrito"
    document.getElementById('empty-cart').addEventListener('click', function() {
        // Vaciar el carrito en localStorage
        localStorage.removeItem('cart');

        // Limpiar la memoria del carrito en la página
        cart = [];
        updateCart();
    });

    updateCart(); // Inicializar el carrito al cargar la página
});





// Cerrar el carrito con animación
function closeCart() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.add('closing');
    setTimeout(() => {
        sidebar.classList.remove('closing');
        sidebar.classList.remove('open'); // Asegúrate de que el carrito esté cerrado
    }, 500); // Duración de la animación
}


// Añadir un producto con animación
function addProduct(productElement) {
    productElement.classList.add('added-animation');
    setTimeout(() => {
        productElement.classList.remove('added-animation');
    }, 700); // Duración de la animación
}



document.querySelector('.close-btn').addEventListener('click', closeCart);


// Guarda los datos del carrito en localStorage antes de redirigir al checkout
document.getElementById('go-to-checkout').addEventListener('click', function() {
    // Guarda los datos del carrito en localStorage
    localStorage.setItem('cartForCheckout', JSON.stringify(cart));

    // Redirige a la página de checkout
    window.location.href = 'Checkout.html';
});



function addToCart(product, button) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage

    // Agregar la animación al botón "Añadir al carrito"
    button.classList.add('added-animation');

    // Eliminar la clase de animación después de la animación
    setTimeout(() => {
        button.classList.remove('added-animation');
    }, 700); // Duración de la animación

    updateCart();
}












/* ----------------------------------------TRANSICIÓN------------------------------------------------------------ */






document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const links = document.querySelectorAll('.transition-link');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            loader.classList.remove('hidden'); // Mostrar la animación de carga

            const targetUrl = this.href;

            // Usar setTimeout para dar tiempo a que la animación se muestre antes de la redirección
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 100);
        });
    });

    window.addEventListener('load', function() {
        loader.classList.add('hidden'); // Ocultar la animación de carga cuando la página esté completamente cargada
    });
});

























