let carrito = {};
let total = 0;

function toggleCarrito() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.style.display = carritoElement.style.display === 'none' ? 'block' : 'none';
}

function agregarAlCarrito(productoId) {
    const producto = document.getElementById(productoId);
    const nombre = producto.querySelector('h3').textContent;
    const precio = parseInt(producto.querySelector('p').textContent.replace('Precio: $', ''));
    
    if (carrito[productoId]) {
        carrito[productoId].cantidad++;
    } else {
        carrito[productoId] = { nombre, precio, cantidad: 1 };
    }
    actualizarCarrito();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    total = 0;

    for (const [id, item] of Object.entries(carrito)) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nombre} - $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}
            <button onclick="restarProducto('${id}')">-</button>
            <button onclick="sumarProducto('${id}')">+</button>
            <button onclick="eliminarProducto('${id}')">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    }

    document.getElementById('total').textContent = total;
}

function restarProducto(id) {
    if (carrito[id].cantidad > 1) {
        carrito[id].cantidad--;
    } else {
        delete carrito[id];
    }
    actualizarCarrito();
}

function sumarProducto(id) {
    carrito[id].cantidad++;
    actualizarCarrito();
}

function eliminarProducto(id) {
    delete carrito[id];
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = {};
    actualizarCarrito();
}