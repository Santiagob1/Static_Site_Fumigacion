document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Recuperar cliente desde localStorage
    const clienteJSON = localStorage.getItem("clienteActualizar");
    if (!clienteJSON) {
        console.warn("⚠️ No hay cliente seleccionado.");
        return;
    }

    let cliente;
    try {
        cliente = JSON.parse(clienteJSON);
        console.log("✅ Cliente recuperado:", cliente);
    } catch (error) {
        console.error("❌ Error al parsear cliente desde localStorage:", error);
        return;
    }

    // Llenar el formulario con los datos del cliente
    document.getElementById("id").value = cliente.id;
    document.getElementById("nombre").value = cliente.nombre;
    document.getElementById("direccion").value = cliente.direccion;
    document.getElementById("telefono").value = cliente.telefono;
    document.getElementById("correo").value = cliente.correo;
    document.getElementById("tarifaInicial").value = cliente.tarifaInicial;
    document.getElementById("mensualidad").value = cliente.mensualidad;
    document.getElementById("codigoPostal").value = cliente.codigoPostal;
    document.getElementById("zona").value = cliente.zona;
    document.getElementById("plagasEncontradas").value = 
        Array.isArray(cliente.plagasEncontradas) ? 
        cliente.plagasEncontradas.join(", ") : 
        cliente.plagasEncontradas;

    // Evento para actualizar cliente
    document.getElementById("form-actualizar").addEventListener("submit", async function (e) {
        e.preventDefault();

        const clienteActualizado = {
            id: document.getElementById("id").value,
            nombre: document.getElementById("nombre").value,
            direccion: document.getElementById("direccion").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            tarifaInicial: parseFloat(document.getElementById("tarifaInicial").value),
            mensualidad: parseFloat(document.getElementById("mensualidad").value),
            codigoPostal: document.getElementById("codigoPostal").value,
            plagasEncontradas: document.getElementById("plagasEncontradas").value,
            zona: document.getElementById("zona").value
        };

        console.log("📤 Enviando actualización:", clienteActualizado);

        try {
            const url = `https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/put/${clienteActualizado.id}`;
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(clienteActualizado)
            };

            const response = await fetch(url, requestOptions);

            if (response.ok) { // ✅ Validamos que la respuesta sea exitosa (200-299)
                alert("✅ Cliente actualizado correctamente.");
                window.location.href = "clientes.html";
            } else {
                const errorMsg = await response.text();
                throw new Error(`Error al actualizar el cliente: ${errorMsg}`);
            }

        } catch (error) {
            console.error("❌ Error en la actualización:", error);
            alert("⚠️ Hubo un error al actualizar el cliente:\n" + error.message);
        }
    });

    // Evento para volver a clientes.html
    document.getElementById("volver-btn").addEventListener("click", function () {
        window.location.href = "clientes.html";
    });
});
