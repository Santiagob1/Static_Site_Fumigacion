document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";

    document.getElementById("form-agregar").addEventListener("submit", function (e) {
        e.preventDefault();

        const cliente = obtenerDatosFormulario();

        fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/clientes", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        }).then(res => {
            if (res.ok) {
                alert("Cliente agregado exitosamente");
                window.location.href = "clientes.html";
            } else {
                alert("Error al agregar cliente");
            }
        });
    });

    function obtenerDatosFormulario() {
        return {
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
