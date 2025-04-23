const productos = [
    { nombre: 'Spray Insecticida', precio: 20000, descripcion: 'Spray contra plagas voladoras.', imagen: 'https://www.mantys.com.co/wp-content/uploads/2020/07/DEMAND-DUO-1000x1000ahora_c-1000x1000_c.jpg' },
    { nombre: 'Gel Cucarachicida', precio: 15000, descripcion: 'Gel especial para cucarachas.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFmXSgeIk4ltkK0F1BlNSVF0tYD-XOF4G8w&s' },
    { nombre: 'Trampas para Ratas', precio: 18000, descripcion: 'Trampas reutilizables para ratas.', imagen: 'https://www.mantys.com.co/wp-content/uploads/2021/03/IMAGEN-MAXTRAP-M-30-1000x1000_c.jpeg' },
    { nombre: 'Veneno para Hormigas', precio: 12000, descripcion: 'Granulado atrayente para hormigas.', imagen: 'https://www.mantys.com.co/wp-content/uploads/2020/11/BANDEJA-PORTACEBOS-2024-MANTYS-1000x1000_c.jpg' },
    { nombre: 'Gel contra moscas', precio: 15000, descripcion: 'Gel especial para moscas.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFmXSgeIk4ltkK0F1BlNSVF0tYD-XOF4G8w&s' },
    { nombre: 'Spray para campos', precio: 20000, descripcion: 'Spray contra insectos en cultivos.', imagen: 'https://www.mantys.com.co/wp-content/uploads/2020/07/DEMAND-DUO-1000x1000ahora_c-1000x1000_c.jpg' },
    { nombre: 'Fumigación SemiProfesional', precio: 80000, descripcion: 'Servicio completo de fumigación.', imagen: 'https://displacol.com/wp-content/uploads/2020/11/dentia-gas.jpg' },
    { nombre: 'Fumigación Profesional', precio: 160000, descripcion: 'Servicio completo de fumigación con mantenimiento', imagen: 'https://displacol.com/wp-content/uploads/2020/11/dentia-gas.jpg' }
  ];
  
  const container = document.getElementById("productos-lista");
  const resumenLista = document.getElementById("resumen-lista");
  const totalCompra = document.getElementById("total-compra");
  const modal = document.getElementById("modal-factura");
  const modalDetalle = document.getElementById("modal-detalle");
  const modalTotal = document.getElementById("modal-total");
  const factura = [];
  
  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio}</strong></p>
      <input type="number" min="0" placeholder="Cantidad" id="cantidad-${index}">
      <button onclick="agregarAFactura(${index})">Agregar</button>
    `;
    container.appendChild(card);
  });
  
  function agregarAFactura(index) {
    const cantidadInput = document.getElementById(`cantidad-${index}`);
    const cantidad = parseInt(cantidadInput.value);
    if (!cantidad || cantidad <= 0) return alert("Ingrese una cantidad válida.");
  
    const producto = productos[index];
    const subtotal = producto.precio * cantidad;
    factura.push({ nombre: producto.nombre, cantidad, subtotal });
    renderizarFactura();
    cantidadInput.value = "";
  }
  
  function renderizarFactura() {
    resumenLista.innerHTML = "";
    let total = 0;
    factura.forEach(item => {
      total += item.subtotal;
      const li = document.createElement("li");
      li.textContent = `${item.cantidad} x ${item.nombre} = $${item.subtotal}`;
      resumenLista.appendChild(li);
    });
    totalCompra.textContent = total;
  }
  
  document.getElementById("realizar-compra").addEventListener("click", () => {
    if (factura.length === 0) return alert("No hay productos en la factura.");
    mostrarModal();
  });
  
  function mostrarModal() {
    modalDetalle.innerHTML = "";
    let total = 0;
    factura.forEach(item => {
      total += item.subtotal;
      const li = document.createElement("li");
      li.textContent = `${item.cantidad} x ${item.nombre} = $${item.subtotal}`;
      modalDetalle.appendChild(li);
    });
    modalTotal.textContent = total;
    modal.style.display = "flex";
  }
  
  function cerrarModal() {
    modal.style.display = "none";
  }
  
  function confirmarFactura() {
    alert("Factura enviada al celular o correo del cliente ✅\n\n(Simulación frontend)");
    factura.length = 0;
    renderizarFactura();
    cerrarModal();
  }
  
  window.onclick = function(event) {
    if (event.target === modal) cerrarModal();
  };
  