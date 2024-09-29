document.addEventListener('DOMContentLoaded', function() {
    const cartItemsElement = document.getElementById('cartItems');
    const totalPriceElem = document.getElementById('totalPrice');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        let total = 0;

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

            // Calcular el precio total
            total += item.price * item.quantity;
        });

        // Mostrar el total
        totalPriceElem.textContent = `Total: S/ ${total.toFixed(2)}`;

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




