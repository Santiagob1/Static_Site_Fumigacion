document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Cargar nombre del usuario
    document.getElementById("nombre-usuario").textContent = localStorage.getItem("usuario") || "Usuario";

    function cargarClientes() {
        fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/clientes", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            const tbody = document.getElementById("clientes-tbody");
            tbody.innerHTML = "";
            data.forEach(cliente => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.direccion}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.tarifaInicial}</td>
                    <td>${cliente.mensualidad}</td>
                    <td>${cliente.codigoPostal}</td>
                    <td>${cliente.plagasEncontradas}</td>
                    <td>${cliente.zona}</td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al cargar clientes:", error));
    }

    // Redireccionar botones a sus respectivas páginas
    document.getElementById("agregar-cliente").addEventListener("click", function () {
        window.location.href = "agregar.html";
    });

    document.getElementById("actualizar-cliente").addEventListener("click", function () {
        window.location.href = "actualizar.html";
    });

    document.getElementById("eliminar-cliente").addEventListener("click", function () {
        window.location.href = "eliminar.html";
    });

    // Cerrar sesión
    document.getElementById("cerrar-sesion").addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });

    cargarClientes();
});
