document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";

    let cancelRequest = false; // Bandera para detectar si se canceló la petición

    // Capturar el botón de volver
    document.querySelector(".return-btn").addEventListener("click", function () {
        cancelRequest = true;
    });

    document.getElementById("form-agregar").addEventListener("submit", function (e) {
        e.preventDefault();

        const cliente = obtenerDatosFormulario();
        console.log("Enviando cliente:", cliente); // Log para verificar el request

        fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/post", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        })
        .then(res => {
            console.log("Código de respuesta:", res.status); // Log del código HTTP
            if (res.ok) {
                alert("Cliente agregado exitosamente");
                window.location.href = "clientes.html";
            } else {
                return res.text().then(text => { throw new Error(text || "Error al agregar cliente"); });
            }
        })
        .catch(err => {
            if (!cancelRequest) { // Solo muestra error si NO se canceló
                console.error("Error al agregar cliente:", err);
                alert("Error al agregar cliente: " + err.message);
            }
        });
    });

    function obtenerDatosFormulario() {
        return {
            id: document.getElementById("id").value,
            nombre: document.getElementById("nombre").value,
            direccion: document.getElementById("direccion").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            tarifaInicial: document.getElementById("tarifaInicial").value,
            mensualidad: document.getElementById("mensualidad").value,
            codigoPostal: document.getElementById("codigoPostal").value,
            plagasEncontradas: document.getElementById("plagasEncontradas").value,
            zona: document.getElementById("zona").value
        };
    }
});
