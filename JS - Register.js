/* -----------------------------REGISTER-------------------------------- */

// Función para guardar los datos de registro
function saveUserData() {
    const userName = document.getElementById('firstName').value;
    const userEmail = document.getElementById('email').value;
    const userPhone = document.getElementById('phone').value;
    const userDNI = document.getElementById('dni').value;
    const userPassword = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar si las contraseñas coinciden
    if (userPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Verificar si el DNI o teléfono ya están registrados
    const existingDNI = localStorage.getItem(userDNI);
    const existingPhone = localStorage.getItem(userPhone);

    if (existingDNI) {
        alert("Ya existe un usuario registrado con este DNI.");
        return;
    }

    if (existingPhone) {
        alert("Ya existe un usuario registrado con este teléfono.");
        return;
    }

    // Guardar datos en localStorage
    localStorage.setItem(userDNI, JSON.stringify({ userName, userEmail, userPhone, userPassword }));
    alert("Registro exitoso.");
    document.getElementById('registerForm').reset();
}

// Manejo del evento de envío del formulario de registro
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío por defecto
        saveUserData(); // Llama a la función para guardar los datos
    });
});
