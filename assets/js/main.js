// Cotizador en tiempo real y WhatsApp API

// Lista de productos (puedes personalizar nombres y precios)
const productos = [
  { nombre: "Gráfica Vehicular e Industrial", precio: 35000 },
  { nombre: "Señaléticas informativas y reflectivas", precio: 12000 },
  { nombre: "Patentes mineras", precio: 9000 },
  { nombre: "Ploteo de vehículos", precio: 45000 },
  { nombre: "Adhesivos PVC", precio: 6000 },
  { nombre: "Impresión Publicitaria", precio: 8000 },
  { nombre: "Pendones", precio: 15000 },
  { nombre: "Gigantografías", precio: 25000 },
  { nombre: "Publicidad personalizada", precio: 20000 },
  { nombre: "Sublimación y Estampado", precio: 7000 }
];

const productosLista = document.getElementById('productos-lista');
const dropArea = document.getElementById('drop-area');
const carritoLista = document.getElementById('carrito-lista');
const totalPrecio = document.getElementById('total-precio');
const btnCotizarWsp = document.getElementById('btn-cotizar-wsp');
const dropPlaceholder = document.getElementById('drop-placeholder');

let carrito = [];

function renderProductos() {
  productosLista.innerHTML = '';
  productos.forEach((prod, idx) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center draggable-producto';
    li.textContent = prod.nombre + ' ';
    const span = document.createElement('span');
    span.className = 'badge bg-secondary rounded-pill';
    span.textContent = `$${prod.precio.toLocaleString()}`;
    li.appendChild(span);
    li.setAttribute('draggable', 'true');
    li.dataset.idx = idx;
    li.addEventListener('dragstart', handleDragStart);
    productosLista.appendChild(li);
  });
}

function renderCarrito() {
  carritoLista.innerHTML = '';
  if (carrito.length === 0) {
    dropPlaceholder.style.display = '';
    btnCotizarWsp.classList.add('disabled');
    totalPrecio.textContent = '$0';
    return;
  }
  dropPlaceholder.style.display = 'none';
  let total = 0;
  carrito.forEach((item, idx) => {
    total += item.precio;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center carrito-producto-row';
    const nombre = document.createElement('span');
    nombre.className = 'carrito-producto-nombre';
    nombre.textContent = item.nombre;
    li.appendChild(nombre);
    const precio = document.createElement('span');
    precio.className = 'carrito-producto-precio badge bg-success rounded-pill ms-2';
    precio.textContent = `$${item.precio.toLocaleString()}`;
    li.appendChild(precio);
    // Botón eliminar
    const btnDel = document.createElement('button');
    btnDel.className = 'btn btn-sm btn-danger ms-2';
    btnDel.innerHTML = '&times;';
    btnDel.title = 'Quitar';
    btnDel.onclick = () => {
      carrito.splice(idx,1);
      renderCarrito();
      updateWspLink();
    };
    li.appendChild(btnDel);
    carritoLista.appendChild(li);
  });
  totalPrecio.textContent = `$${total.toLocaleString()}`;
  btnCotizarWsp.classList.remove('disabled');
  updateWspLink();
}

function handleDragStart(e) {
  e.dataTransfer.setData('producto-idx', e.target.dataset.idx);
}

dropArea.addEventListener('dragover', function(e) {
  e.preventDefault();
  dropArea.classList.add('bg-light');
});
dropArea.addEventListener('dragleave', function() {
  dropArea.classList.remove('bg-light');
});
dropArea.addEventListener('drop', function(e) {
  e.preventDefault();
  dropArea.classList.remove('bg-light');
  const idx = e.dataTransfer.getData('producto-idx');
  if (typeof idx !== 'undefined' && productos[idx]) {
    carrito.push(productos[idx]);
    renderCarrito();
    updateWspLink();
  }
});

function updateWspLink() {
  if (carrito.length === 0) {
    btnCotizarWsp.href = '#';
    return;
  }
  const mensaje = 'Hola, quiero cotizar los siguientes productos:%0A' +
    carrito.map(item => `- ${item.nombre}: $${item.precio.toLocaleString()}`).join('%0A') +
    `%0ATotal: $${carrito.reduce((a,b)=>a+b.precio,0).toLocaleString()}`;
  btnCotizarWsp.href = `https://wa.me/56912345678?text=${mensaje}`;
}

// Inicializar cotizador drag & drop
renderProductos();
renderCarrito();
