document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("correo").value.trim();
        const password = document.getElementById("contrasena").value.trim();

        let errorMsg = document.getElementById("error-message");
        if (!errorMsg) {
            errorMsg = document.createElement("p");
            errorMsg.id = "error-message";
            errorMsg.style.color = "red";
            loginForm.appendChild(errorMsg);
        }
        errorMsg.textContent = "";

        if (!email || !password) {
            errorMsg.textContent = "Por favor, completa todos los campos.";
            return;
        }

        try {
            const requestBody = JSON.stringify({ correo: email, contrasena: password });
            console.log("Petición enviada al backend:", requestBody); // Ver la petición

            const response = await fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: requestBody
            });

            const data = await response.json();
            console.log("Respuesta completa del backend:", data); // Ver la respuesta

            if (!response.ok || data.error) {
                console.error("Error en la respuesta del backend:", data);
                throw new Error(data.message || "Credenciales incorrectas");
            }

            if (!data.respuesta || !data.respuesta.token) {
                throw new Error("El backend no devolvió un token válido");
            }

            const token = data.respuesta.token;
            localStorage.setItem("token", token);
            console.log("Token guardado en localStorage:", localStorage.getItem("token")); // Verificar si se guardó

            window.location.href = "clientes.html";
        } catch (err) {
            console.error("Error en el login:", err);
            errorMsg.textContent = err.message || "Error al iniciar sesión.";
        }
    });
});
