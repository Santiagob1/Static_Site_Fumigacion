
document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const tbody = document.getElementById("clientes-tbody");
    const btnAgregar = document.getElementById("agregar-cliente");
    const btnActualizar = document.getElementById("actualizar-cliente");
    const btnEliminar = document.getElementById("eliminar-cliente");
    const btnVenta = document.getElementById("realizar-venta");
    const btnReportes = document.getElementById("reportes");
    const btnCerrarSesion = document.getElementById("cerrar-sesion");

    let clienteSeleccionado = null;

    btnAgregar.addEventListener("click", function () {
        window.location.href = "agregar.html";
    });
    btnReportes.addEventListener("click", function () {
        window.location.href = "reportes.html";
    });

    btnCerrarSesion.addEventListener("click", function () {
        const confirmar = confirm("¿Estás seguro de que quieres cerrar sesión?");
        if (confirmar) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        }
    });

    async function cargarClientes() {
        try {
            const url = "https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/all";
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            };

            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error("Error al obtener los clientes");
            }

            const data = await response.json();
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

                row.addEventListener("click", function () {
                    seleccionarCliente(cliente, row);
                });

                tbody.appendChild(row);
            });

        } catch (error) {
            console.error("❌ Error en cargarClientes:", error);
            alert("Hubo un error al cargar los clientes.");
        }
    }

    function seleccionarCliente(cliente, row) {
        document.querySelectorAll("#clientes-tbody tr").forEach(tr => tr.classList.remove("seleccionado"));
        row.classList.add("seleccionado");

        clienteSeleccionado = cliente;
        localStorage.setItem("clienteActualizar", JSON.stringify(cliente));
        btnActualizar.removeAttribute("disabled");
        btnEliminar.removeAttribute("disabled");
        btnVenta.removeAttribute("disabled");
    }

    btnActualizar.addEventListener("click", function () {
        if (!clienteSeleccionado) return alert("Seleccione un cliente primero.");
        window.location.href = "actualizar.html";
    });

    btnEliminar.addEventListener("click", async function () {
        if (!clienteSeleccionado) return alert("Seleccione un cliente primero.");
        const confirmacion = confirm(`¿Está seguro de que desea eliminar a ${clienteSeleccionado.nombre}?`);
        if (!confirmacion) return;

        try {
            const url = `https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/delete/${clienteSeleccionado.id}`;
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            };
            const response = await fetch(url, requestOptions);

            if (response.ok) {
                alert("Cliente eliminado correctamente ✅");
                document.querySelectorAll("#clientes-tbody tr").forEach(row => {
                    if (row.firstChild.textContent == clienteSeleccionado.id) {
                        row.remove();
                    }
                });
                clienteSeleccionado = null;
                btnActualizar.setAttribute("disabled", "true");
                btnEliminar.setAttribute("disabled", "true");
                btnVenta.setAttribute("disabled", "true");
            } else {
                const errorMsg = await response.text();
                throw new Error(`Error al eliminar el cliente: ${errorMsg}`);
            }

        } catch (error) {
            console.error("❌ Error al eliminar cliente:", error);
            alert("Hubo un error al eliminar el cliente. Verifica que el servidor esté en línea.");
        }
    });

    btnVenta.addEventListener("click", function () {
        if (!clienteSeleccionado) {
            alert("Seleccione un cliente primero.");
            return;
        }
        localStorage.setItem("clienteVenta", JSON.stringify(clienteSeleccionado));
        window.location.href = "ventas.html";
    });
    

    await cargarClientes();
});
