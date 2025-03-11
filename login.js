document.addEventListener("DOMContentLoaded", function () {
    localStorage.removeItem("token");
    
    document.getElementById("login-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        const response = await fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/auth/loginAdmin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena })
        });
        
        const data = await response.json();
        
        if (!data.error) {
            localStorage.setItem("token", data.respuesta.token);
            window.location.href = "clientes.html";
        } else {
            alert("Error en las credenciales");
        }
    });
});
