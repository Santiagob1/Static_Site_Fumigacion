document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("correo").value.trim();
        const password = document.getElementById("contrasena").value.trim();

        // Buscar si ya existe un mensaje de error y eliminarlo
        let errorMsg = document.getElementById("error-message");
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.id = "error-message";
            errorMsg.style.color = "red";
            loginForm.appendChild(errorMsg);
        }
        errorMsg.textContent = ""; // Limpiar mensaje previo

        // Validación de campos vacíos
        if (!email || !password) {
            errorMsg.textContent = "Por favor, completa todos los campos.";
            return;
        }

        try {
            const response = await fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Credenciales incorrectas");
            }

            localStorage.setItem("token", data.token);
            window.location.href = "clientes.html";
        } catch (err) {
            errorMsg.textContent = err.message || "Error al iniciar sesión.";
        }
    });
});
