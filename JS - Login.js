/* ----------------------------REGISTER-------------------------- */
function saveUserData() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dni = document.getElementById("dni").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const registerPassword = document.getElementById("registerPassword").value;

    // Comprobar si el DNI ya está registrado
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.some(user => user.dni === dni);

    if (userExists) {
        alert("Ya existe un usuario registrado con este DNI.");
        return;
    }

    const newUser = { firstName, lastName, dni, email, phone, registerPassword };
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Guardar los nombres en userName1
    localStorage.setItem("userName1", firstName); // Guardamos el primer nombre

    // Imprimir en consola para depuración
    console.log("Registro exitoso:", newUser);
    
    alert("Registro exitoso.");
    // Redirigir a la página de inicio de sesión o realizar otra acción
}



/* ----------------------LOGIN------------------------------------ */
function login() {
    const dniOrEmail = document.getElementById("loginInput").value;
    const password = document.getElementById("loginPassword").value;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = existingUsers.find(user => (user.dni === dniOrEmail || user.email === dniOrEmail) && user.registerPassword === password);

    if (user) {
        alert("Inicio de sesión exitoso. ");
        // Guardar el DNI en localStorage
        localStorage.setItem("loggedInDNI", user.dni);
        // Redirigir al usuario a la nueva página
        window.location.href = "Usuario.html"; // Cambia "Usuario.html" al nombre de tu archivo
    } else {
        alert("Credenciales inválidas.");
    }
}

/*---------------------------------- MODAL LOGIN-------------------------------- */

// Modal.js

// Obtener elementos
const modal = document.getElementById('authModal');
const triggers = [document.getElementById('loginTrigger1'), document.getElementById('loginTrigger2')];
const closeModal = document.querySelector('.close');

// Abrir modal cuando se haga clic en cualquiera de los activadores
triggers.forEach(trigger => {
    trigger.addEventListener('click', function(event) {
        const loggedInDNI = localStorage.getItem('loggedInDNI'); // Obtener el DNI de usuario logueado
        if (!loggedInDNI) { // Solo abrir el modal si no hay usuario logueado
            event.preventDefault(); // Evitar la redirección
            modal.style.display = 'flex'; // Mostrar el modal
        } else {
            // Redirigir a Usuario.html si ya hay un usuario logueado
            window.location.href = "Usuario.html"; // Cambia "Usuario.html" al nombre de tu archivo
        }
    });
});

// Cerrar el modal cuando se hace clic en la 'X'
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera de él
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Función para cambiar entre las secciones de Login y Register
function openTab(evt, sectionName) {
    var i, tabcontent, tablinks;

    // Ocultar todas las secciones
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Quitar la clase 'active' de todas las pestañas
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la sección seleccionada y añadir la clase 'active' a la pestaña seleccionada
    document.getElementById(sectionName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Mostrar el login por defecto
document.getElementById("loginSection").style.display = "block";

// Función para mostrar/ocultar contraseñas
function togglePassword(id) {
    var input = document.getElementById(id);
    input.type = (input.type === "password") ? "text" : "password";
}














