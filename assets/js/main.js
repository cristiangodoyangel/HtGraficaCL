// Cotizador en tiempo real y WhatsApp API

// Lista de productos (puedes personalizar nombres y precios)
const productos = [
  { nombre: "Gráfica Vehicular e Industrial" },
  { nombre: "Señaléticas informativas y reflectivas" },
  { nombre: "Patentes mineras" },
  { nombre: "Ploteo de vehículos" },
  { nombre: "Adhesivos PVC" },
  { nombre: "Impresión Publicitaria" },
  { nombre: "Pendones" },
  { nombre: "Gigantografías" },
  { nombre: "Publicidad personalizada" },
  { nombre: "Sublimación y Estampado" }
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
    li.textContent = prod.nombre;

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

    return;
  }
  dropPlaceholder.style.display = 'none';
  carrito.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center carrito-producto-row';
    const nombre = document.createElement('span');
    nombre.className = 'carrito-producto-nombre';
    nombre.textContent = item.nombre;
    li.appendChild(nombre);
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
    carrito.map(item => `- ${item.nombre}`).join('%0A');
  btnCotizarWsp.href = `https://wa.me/56951727028?text=${mensaje}`;
}

// Inicializar cotizador drag & drop
renderProductos();
renderCarrito();
