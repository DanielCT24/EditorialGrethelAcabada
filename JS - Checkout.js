document.addEventListener('DOMContentLoaded', function() {
    const checkoutContent = document.querySelector('.checkout-content');
    const totalElem = document.querySelector('.checkout-footer .total');
    const emptyCartButton = document.querySelector('.empty-cart-button');
    const payButton = document.querySelector('.pay-button');

// Función para guardar los datos en localStorage
function saveCartData() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDataToSave = cart.map(item => ({
        image: item.image,
        name: item.name,
        quantity: item.quantity,
        price: item.price,  // Guardamos el precio del item
        total: (item.price * item.quantity).toFixed(2) // Calculamos el total y lo guardamos
    }));
    localStorage.setItem('savedCartData', JSON.stringify(cartDataToSave));
}

// Evento para el botón de finalizar
document.getElementById('finalize-btn').addEventListener('click', () => {
    saveCartData();
    alert('Compra Exitosa, Verifique su perfil');
});

// Función existente para actualizar el checkout
function updateCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    summaryItemsElement.innerHTML = '';

    let grandTotal = 0;

    cart.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('summary-item');
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h4 class="item-name">${item.name}</h4>
                <p class="item-price">Precio: S/ ${item.price.toFixed(2)}</p>
                <p class="item-quantity">Cantidad: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></p>
                <p class="item-total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
                <button class="delete-button" data-id="${item.id}"><img src="trash-icon.png" alt="Eliminar" class="delete-button remove-icon"></button>
            </div>
        `;
        summaryItemsElement.appendChild(itemCard);

        grandTotal += item.price * item.quantity;
    });

    // Actualiza el total final si es necesario
    // Aquí podrías añadir lógica para mostrar el total en el HTML
}

    
    function updateCheckout() {
        
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        checkoutContent.innerHTML = '';

        let grandTotal = 0;

        cart.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h2>${item.name}</h2>
                    <p class="price">S/ ${item.price.toFixed(2)}</p>
                    <p>Cantidad: <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}"></p>
                    <p class="total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="remove-button" data-id="${item.id}">
                    </button>
                </div>
            `;
            checkoutContent.appendChild(itemCard);

            grandTotal += item.price * item.quantity;
        });

        totalElem.textContent = `Total: S/ ${grandTotal.toFixed(2)}`;
    }

    function handleCartUpdates(event) {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value, 10);
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = cart.find(item => item.id === id);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCheckout();
            }
        }

        if (event.target.closest('.remove-button')) {
            const id = event.target.closest('.remove-button').getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCheckout();
        }
    }

    function handleButtonActions(event) {
        if (event.target === emptyCartButton) {
            localStorage.removeItem('cart');
            updateCheckout();
        }

        if (event.target === payButton) {
            // Aquí iría el código para manejar el pago
            alert('Proceso de pago en desarrollo.');
        }
    }

    checkoutContent.addEventListener('input', handleCartUpdates);
    checkoutContent.addEventListener('click', handleCartUpdates);
    document.addEventListener('click', handleButtonActions);

    updateCheckout();
});


/* TODA LA CONFIGURACION DEL CHECKOUT */



document.addEventListener('DOMContentLoaded', function() {
    const summaryItemsElement = document.getElementById('summaryItems');
    const summaryTotalElem2 = document.getElementById('summaryTotal2');
    const costoEnvioElem = document.getElementById('costoEnvio');
    const costoImpuestoElem = document.getElementById('costoImpuesto');
    const progressBar = document.getElementById('progress-bar');
    const freeShippingMessage = document.getElementById('free-shipping-message');
    const summaryTotalGeneralElem = document.getElementById('summaryTotalGeneral'); // Primer total general
    const summaryTotalGeneral2Elem = document.getElementById('summaryTotalGeneral2'); // Segundo total general

    function roundAmount(amount) {
        // Redondear el valor a la siguiente decena si el centavo es mayor a 6
        const rounded = Math.round(amount * 10) / 10;
        return rounded;
    }

    function updateCheckout() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        summaryItemsElement.innerHTML = '';

        let grandTotal = 0;

        cart.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('summary-item');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h4 class="item-name">${item.name}</h4>
                    <p class="item-price">Precio: S/ ${item.price.toFixed(2)}</p>
                    <p class="item-quantity">Cantidad: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input"></p>
                    <p class="item-total">Total: S/ ${(item.price * item.quantity).toFixed(2)}</p>
                    <button class="delete-button" data-id="${item.id}"><img src="trash-icon.png" alt="Eliminar" class="delete-button remove-icon"></button>
                </div>
            `;
            summaryItemsElement.appendChild(itemCard);

            grandTotal += item.price * item.quantity;
        });

        // Calcular el costo de envío
        const costoEnvio = grandTotal >= 40 ? 0 : 8;
        let textoEnvio = grandTotal >= 40 ? "Envío Gratuito" : `S/ ${costoEnvio.toFixed(2)}`;

        // Calcular el 5% del total sin costo de envío
        const impuesto = grandTotal * 0.05;

        // Calcular el total general
        const summaryTotalGeneral = grandTotal + costoEnvio + impuesto;

        // Aplicar redondeo
        const summaryTotalGeneralRounded = roundAmount(summaryTotalGeneral);

        // Actualizar el summaryTotal
        summaryTotalElem2.textContent = `Subtotal: S/ ${grandTotal.toFixed(2)}`;








        // Ocultar o mostrar el div de totales según el subtotal
        const totalesDiv = document.querySelector('.totales');
        if (grandTotal === 0) {
            totalesDiv.style.display = 'none';
        } else {
            totalesDiv.style.display = 'block';
        }













        // Actualizar el costo de envío en la página
        costoEnvioElem.textContent = `Costo de envío: ${textoEnvio}`;

        // Actualizar el impuesto en la página
        costoImpuestoElem.textContent = `IGV (5%): S/ ${impuesto.toFixed(2)}`;

        // Actualizar el primer total general en la página
        summaryTotalGeneralElem.textContent = `Total: S/ ${summaryTotalGeneralRounded.toFixed(2)}`;

        // Actualizar el segundo total general en la página (copia exacta del primer total general)
        summaryTotalGeneral2Elem.textContent = `S/ ${summaryTotalGeneralRounded.toFixed(2)}`;

       // Actualizar la barra de progreso
const maxTotal = 40;
const remainingAmount = maxTotal - grandTotal;
const progressPercentage = Math.min((grandTotal / maxTotal) * 100, 100);

progressBar.style.width = `${progressPercentage}%`;

// Mostrar el mensaje de cuánto falta para el envío gratis
if (remainingAmount > 0) {
    progressBar.textContent = `Te faltan S/ ${remainingAmount.toFixed(2)} para el envío gratis`;
} else {
    progressBar.textContent = `¡Envío gratis!`;
}

// Mostrar también el total gastado
progressBar.textContent += ``;
        // Guardar el total en localStorage
        localStorage.setItem('grandTotal', grandTotal.toFixed(2));
    }

    function handleCartUpdates(event) {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const newQuantity = parseInt(event.target.value, 10);
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const product = cart.find(item => item.id === id);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCheckout();
            }
        } else if (event.target.classList.contains('delete-button')) {
            const id = event.target.getAttribute('data-id');
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCheckout();
        }
    }

    // Escuchar cambios en el input de cantidad y clics en el botón de eliminar
    document.querySelector('.order-summary').addEventListener('input', handleCartUpdates);
    document.querySelector('.order-summary').addEventListener('click', handleCartUpdates);

    // Escuchar cambios en el localStorage (para actualización automática desde otras partes de la app)
    window.addEventListener('storage', function(event) {
        if (event.key === 'cart') {
            updateCheckout();
        }
    });

    // Inicializar
    updateCheckout();
    
});

















/* -----DESHABILITA EL BOTON CONTINUAR ---------------- */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const btnDetalles = document.getElementById('btn-detalles');
    
    const checkFormValidity = () => {
        btnDetalles.disabled = !form.checkValidity();
    };
    
    // Monitorizar cambios en el formulario
    form.addEventListener('input', checkFormValidity);
    
    // Verificar la validez inicial del formulario al cargar la página
    checkFormValidity();
});








/* VENTANA EMERGENTE */


document.querySelector('.btn-detalles').addEventListener('click', function() {
    // Obtén el valor seleccionado
    var selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Cierra todas las ventanas emergentes primero
    closeAllPopups();
    
    // Abre la ventana emergente correspondiente
    if (selectedPayment === 'paypal') {
        document.getElementById('paypal-popup').style.display = 'block';
    } else if (selectedPayment === 'culqi') {
        document.getElementById('culqi-popup').style.display = 'block';
    } else if (selectedPayment === 'yape') {
        document.getElementById('yape-popup').style.display = 'block';
    }
});

function closeAllPopups() {
    document.getElementById('paypal-popup').style.display = 'none';
    document.getElementById('culqi-popup').style.display = 'none';
    document.getElementById('yape-popup').style.display = 'none';
}

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}




/* -----------------YAPE--------------------- */


function validateForm() {
    const operacion = document.getElementById('operacion').value;
    const confirmaOperacion = document.getElementById('confirma-operacion').value;
    const fechaHora = document.getElementById('fecha-hora').value;
    const comprobante = document.getElementById('comprobante').files.length > 0;

    if (operacion && confirmaOperacion && fechaHora && comprobante) {
        document.getElementById('finalize-btn').disabled = false;
    } else {
        document.getElementById('finalize-btn').disabled = true;
    }
}

function handleFileUpload() {
    const fileInput = document.getElementById('comprobante');
    const label = document.getElementById('upload-label');

    if (fileInput.files.length > 0) {
        label.textContent = fileInput.files[0].name;
        label.classList.add('active');
        validateForm();  // Revalidar el formulario cuando se sube un archivo
    }
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}





/* --------NO PERMITE NUMEROS EN NOMBRES Y APELLIDOS --------------*/

document.addEventListener('DOMContentLoaded', () => {
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');

    function validateTextInput(event) {
        const value = event.target.value;
        // Remove any character that is not a letter or space
        event.target.value = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ\s]/g, '');
    }

    firstNameInput.addEventListener('input', validateTextInput);
    lastNameInput.addEventListener('input', validateTextInput);
});


/* --------NO PERMITE OTRO FORMATO AL GMAIL --------------*/


document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('email-feedback');

    function validateEmail(email) {
        // Regex para validar formato de email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return emailRegex.test(email);
    }

    function validateEmailInput(event) {
        const emailValue = event.target.value;

        if (validateEmail(emailValue)) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailFeedback.textContent = 'Formato válido de correo electrónico';
            emailFeedback.classList.add('valid-feedback');
            emailFeedback.classList.remove('feedback');
        } else {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
            emailFeedback.textContent = 'Formato de correo electrónico inválido. Debe ser de Gmail.';
            emailFeedback.classList.add('feedback');
            emailFeedback.classList.remove('valid-feedback');
        }
    }

    emailInput.addEventListener('input', validateEmailInput);
});


/* --------NO PERMITE OTRO FORMATO AL NUMERO Y DNI  --------------*/
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    const dniInput = document.getElementById('dni');

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    });

    dniInput.addEventListener('input', () => {
        dniInput.value = dniInput.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    });
});






/* VERIFICA QUE EL NUMERO EMPIECE EN 9 */


document.getElementById('phone').addEventListener('input', function() {
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value;

    // Verificamos que el primer carácter sea '9' solo si hay al menos un carácter
    if (phoneValue.length > 0 && phoneValue[0] !== '9') {
        alert('El número de teléfono es inválido');
        phoneInput.value = ''; // Limpiamos el campo si el primer carácter no es 9
    }
});









/* ------------------GUARDA LOS DATOS PARA LA BOLETA----------------- */



    document.getElementById('btn-detalles').addEventListener('click', function() {
        // Obtén los datos de los elementos del resumen
        const summaryItems = document.getElementById('summary-items').innerHTML;
        const summaryTotal = document.getElementById('summary-total').innerHTML;
        
        // Crea un objeto con los datos
        const data = {
            summaryItems: summaryItems,
            summaryTotal: summaryTotal,
            shippingAddress: {
                district: document.getElementById('district').value,
                street: document.getElementById('street').value,
                apartment: document.getElementById('apartment').value,
                postalCode: document.getElementById('postal-code').value,
                alias: document.getElementById('alias').value
            },
            deliveryOption: document.querySelector('input[name="delivery"]:checked') ? document.querySelector('input[name="delivery"]:checked').value : null
        };

        // Guarda el objeto en localStorage como una cadena JSON
        localStorage.setItem('purchaseData', JSON.stringify(data));

        // Muestra una confirmación si deseas
        alert('Datos guardados exitosamente!');
    });











// Validación de formulario y habilitación del botón
document.getElementById('operacion').addEventListener('input', validateForm);
document.getElementById('confirma-operacion').addEventListener('input', validateForm);
document.getElementById('fecha-hora').addEventListener('change', validateForm);




/* ---------------------DATOS DE COMPRA-------------------- */


/* DIRECCION DE ENVIO */
const streetInput = document.getElementById('street');

// Guardar en localStorage al perder el enfoque
streetInput.addEventListener('blur', function() {
    const streetValue = streetInput.value; // Obtener el valor del input
    localStorage.setItem('streetAddress', streetValue); // Guardar en localStorage
});




function generarID() {
    return 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function obtenerFechaActual() {
    const ahora = new Date();
    const dia = String(ahora.getDate()).padStart(2, '0');
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const año = ahora.getFullYear();
    return `${año}-${mes}-${dia}`;
}

function obtenerPrecio() {
    return document.getElementById('summaryTotalGeneral2').textContent;
}

function obtenerSubtotal() {
    return document.getElementById('summaryTotal2').textContent;
}

function obtenerImpuesto() {
    return document.getElementById('costoImpuesto').textContent;
}

function obtenerEnvio() {
    return document.getElementById('costoEnvio').textContent;
}
function obtenerProductos() {
    return document.getElementById('summaryItems').textContent;
}

/* -------BOLETA------------ */

function finalizePurchase(mensajePersonalizado) {
    const nuevoID = generarID();
    const fechaActual = obtenerFechaActual();
    const precio = obtenerPrecio();
    const subtotal = obtenerSubtotal();
    const impuesto = obtenerImpuesto();
    const envio = obtenerEnvio();
    const productos = obtenerProductos();

    let datosGenerados = JSON.parse(localStorage.getItem('datosGenerados')) || [];
    datosGenerados.push({ 
        id: nuevoID, 
        fecha: fechaActual, 
        precio: precio, 
        subtotal: subtotal, 
        impuesto: impuesto, 
        envio: envio, 
    });
    localStorage.setItem('datosGenerados', JSON.stringify(datosGenerados));

    // Separar datos en dos divs
    document.getElementById('datosCompras').innerHTML = `
        <p>ID de Compra: ${nuevoID}</p>
        <p>Fecha de Compra: ${fechaActual}</p>
    `;
    
    document.getElementById('datosEnvio').innerHTML = `
        <p>Precio: ${precio}</p>
        <p>Subtotal: ${subtotal}</p>
        <p>Impuesto: ${impuesto}</p>
        <p>Envío: ${envio}</p>
    `;

    showModal(mensajePersonalizado || `¡Felicidades por tu compra!`);

    function showModal(message) {
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('customModal').style.display = 'block';

        // Cerrar el modal después de 6 segundos
        setTimeout(() => {
            closeModal();
        }, 6000); // 6000 milisegundos = 6 segundos
    }

    function closeModal() {
        document.getElementById('customModal').style.display = 'none';
    }
}





/* DÍAS DE PEDIDOS */
function setDeliveryDates(startId, endId) {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

    const startDate = today.toLocaleDateString('es-ES', options).replace(/\//g, '-');
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 3);
    const endDate = futureDate.toLocaleDateString('es-ES', options).replace(/\//g, '-');

    document.getElementById(startId).textContent = startDate;
    document.getElementById(endId).textContent = endDate;
}

// Llamar la función para cada conjunto de fechas
setDeliveryDates('start-date-1', 'end-date-1');
setDeliveryDates('start-date-2', 'end-date-2');
setDeliveryDates('start-date-3', 'end-date-3');










