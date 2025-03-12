document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (e) {
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

        // Validación de campos vacíos
        if (!email || !password) {
            errorMsg.textContent = "Por favor, completa todos los campos.";
            return;
        }

        fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => {
            if (!res.ok) throw new Error("Credenciales incorrectas");
            return res.json();
        })
        .then(data => {
            localStorage.setItem("token", data.token);
            window.location.href = "clientes.html";
        })
        .catch(err => {
            errorMsg.textContent = err.message || "Error al iniciar sesión.";
        });
    });
});
