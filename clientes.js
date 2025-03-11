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
                    <td>
                        <button onclick='seleccionarCliente(${JSON.stringify(cliente)})'>Editar</button>
                        <button onclick='eliminarCliente(${cliente.id})'>Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
    }
    
    document.getElementById("cerrar-sesion").addEventListener("click", function () {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });
    
    document.getElementById("agregar").addEventListener("click", function () {
        const cliente = obtenerDatosFormulario();
        fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/clientes", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        }).then(() => cargarClientes());
    });

    document.getElementById("actualizar").addEventListener("click", function () {
        const cliente = obtenerDatosFormulario();
        fetch(`https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/${cliente.id}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        }).then(() => cargarClientes());
    });
    
    function eliminarCliente(id) {
        if (confirm("¿Está seguro de eliminar este cliente?")) {
            fetch(`https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            }).then(() => cargarClientes());
        }
    }

    function seleccionarCliente(cliente) {
        document.getElementById("id").value = cliente.id;
        document.getElementById("nombre").value = cliente.nombre;
        document.getElementById("direccion").value = cliente.direccion;
        document.getElementById("telefono").value = cliente.telefono;
        document.getElementById("correo").value = cliente.correo;
        document.getElementById("tarifaInicial").value = cliente.tarifaInicial;
        document.getElementById("mensualidad").value = cliente.mensualidad;
        document.getElementById("codigoPostal").value = cliente.codigoPostal;
        document.getElementById("plagasEncontradas").value = cliente.plagasEncontradas;
        document.getElementById("zona").value = cliente.zona;
    }
    
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
    
    cargarClientes();
});
