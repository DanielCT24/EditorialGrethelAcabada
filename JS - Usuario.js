// Obtener el DNI guardado del localStorage
const loggedInDNI = localStorage.getItem("loggedInDNI");
        
// Obtener los usuarios del localStorage
const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

// Buscar el usuario basado en el DNI
const user = existingUsers.find(user => user.dni === loggedInDNI);

// Mostrar la información del usuario
if (loggedInDNI) {
    document.getElementById("userDNI").textContent = loggedInDNI;
    if (user) {
        document.getElementById("userNames").textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userPhone").textContent = user.phone;
    } else {
        document.getElementById("userNames").textContent = "No se encontró el usuario.";
    }
} else {
    document.getElementById("userDNI").textContent = "No has iniciado sesión.";
    document.getElementById("userNames").textContent = "";
    document.getElementById("userEmail").textContent = "";
    document.getElementById("userPhone").textContent = "";
}




  /* ------------------------CERRAR SESIÓN------------------------ */

  document.getElementById("logoutButton").addEventListener("click", function() {
    // Verificar si hay un DNI en localStorage
    const loggedInDNI = localStorage.getItem("loggedInDNI");

    if (loggedInDNI) {
        // Eliminar el DNI de localStorage (cerrar sesión)
        localStorage.removeItem("loggedInDNI");
        alert("Has cerrado sesión.");
        // Redirigir a la página de inicio
        window.location.href = "/"; // Cambia a la ruta de tu página de inicio
    } else {
        // Si no está logueado, redirigir a la página principal
        window.location.href = "/";
    }
});
