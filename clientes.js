document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Cargar nombre del usuario desde localStorage
    document.getElementById("nombre-usuario").textContent = localStorage.getItem("usuario") || "Usuario";

    async function cargarClientes() {
        try {
            console.log("Realizando solicitud a la API de clientes...");

            const response = await fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/clientes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            console.log("Respuesta cruda del servidor:", response);

            if (!response.ok) {
                const errorText = await response.text(); // Captura la respuesta exacta del backend
                console.error("Error al obtener clientes. Respuesta del backend:", errorText);
                throw new Error("Error al obtener los clientes: " + errorText);
            }

            const data = await response.json();
            console.log("Datos recibidos:", data);

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
                    <td>${Array.isArray(cliente.plagasEncontradas) ? cliente.plagasEncontradas.join(", ") : cliente.plagasEncontradas}</td>
                    <td>${cliente.zona}</td>
                `;
                tbody.appendChild(row);
            });

        } catch (error) {
            console.error("Error en cargarClientes:", error);
            alert("Hubo un error al cargar los clientes. Revisa la consola para más detalles.");
        }
    }

    // Redireccionar botones a sus respectivas páginas
    document.getElementById("agregar-cliente").addEventListener("click", function () {
        window.location.href = "agregar_cliente.html";
    });

    document.getElementById("actualizar-cliente").addEventListener("click", function () {
        window.location.href = "actualizar_cliente.html";
    });

    document.getElementById("eliminar-cliente").addEventListener("click", function () {
        window.location.href = "eliminar_cliente.html";
    });

    // Botón de cerrar sesión
    document.getElementById("cerrar-sesion").addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });

    await cargarClientes();
});
