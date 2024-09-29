// Variables para controlar el estado del carrito
let carritoAbierto = false;

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebar.style.visibility = 'hidden';
        carritoAbierto = false;
    } else {
        sidebar.classList.add('open');
        sidebar.style.visibility = 'visible';
        carritoAbierto = true;
    }
}

// Evento para abrir el carrito al hacer clic en el botón "Añadir al carrito"
document.querySelectorAll('.btn__add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = this.getAttribute('data-price');
        const productImg = this.getAttribute('data-img');

        // Crear el elemento del producto en el carrito
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="cart-item-image-wrapper">
                <div class="cart-item-image-container">
                    <img src="${productImg}" alt="${productName}">
                </div>
            </div>
            <div class="cart-item-details">
                <h3>${productName}</h3>
                <p class="price">S/ ${productPrice}</p>
                <input type="number" value="1" min="1" class="quantity-input">
            </div>
        `;

        // Añadir el producto al contenedor del carrito
        document.getElementById('cartItems').appendChild(cartItem);

        // Activar la animación de bounce al añadir
        cartItem.classList.add('added-animation');

        // Abrir el carrito si no está abierto
        if (!carritoAbierto) {
            toggleSidebar();
        }
    });
});

// Evento para cerrar el carrito
document.querySelector('.close-btn').addEventListener('click', toggleSidebar);
