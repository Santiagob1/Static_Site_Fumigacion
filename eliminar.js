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

    document.getElementById("form-eliminar").addEventListener("submit", function (e) {
        e.preventDefault();
        const id = document.getElementById("id").value;

        if (confirm("¿Está seguro de eliminar este cliente?")) {
            fetch(`https://empresa-fumigacion-latest.onrender.com/api/v1/clientes/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            }).then(res => {
                if (res.ok) {
                    alert("Cliente eliminado correctamente");
                    window.location.href = "clientes.html";
                } else {
                    alert("Error al eliminar cliente");
                }
            });
        }
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

    cargarClientes();
});
