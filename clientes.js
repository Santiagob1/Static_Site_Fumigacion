document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";

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
        });
    }

    document.getElementById("cerrar-sesion").addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });

    document.getElementById("btn-agregar").addEventListener("click", function () {
        window.location.href = "agregar.html";
    });

    document.getElementById("btn-actualizar").addEventListener("click", function () {
        window.location.href = "actualizar.html";
    });

    document.getElementById("btn-eliminar").addEventListener("click", function () {
        window.location.href = "eliminar.html";
    });

    cargarClientes();
});
