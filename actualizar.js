document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "login.html";

    const selectClientes = document.getElementById("cliente-select");

    function cargarClientes() {
        fetch("https://empresa-fumigacion-latest.onrender.com/api/v1/clientes", {
            headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(clientes => {
            selectClientes.innerHTML = '<option value="">Seleccione un cliente</option>';
            clientes.forEach(cliente => {
                const option = document.createElement("option");
                option.value = JSON.stringify(cliente);
                option.textContent = cliente.nombre;
                selectClientes.appendChild(option);
            });
        });
    }

    selectClientes.addEventListener("change", function () {
        if (this.value) {
            const cliente = JSON.parse(this.value);
            llenarFormulario(cliente);
        }
    });

    document.getElementById("form-actualizar").addEventListener("submit", function (e) {
        e.preventDefault();
        const cliente = obtenerDatosFormulario();

        fetch(`https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/${cliente.id}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        }).then(res => {
            if (res.ok) {
                alert("Cliente actualizado correctamente");
                window.location.href = "clientes.html";
            } else {
                alert("Error al actualizar cliente");
            }
        });
    });

    function llenarFormulario(cliente) {
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
