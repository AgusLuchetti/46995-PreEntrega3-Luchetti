import { productosEnStock } from "./inicio.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))


document.addEventListener("DOMContentLoaded", () => {
    ArmarCarrito()
})


let carrito = JSON.parse(sessionStorage.getItem("carrito"))
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")

const carritoTable = document.getElementById("carrito")


btnCarrito.addEventListener("click", () => {    
    if(carritoTable.style.display === "block"){
        carritoTable.style.display = "none"
    }else{
        carritoTable.style.display = "block"
        ArmarCarrito()
    }
    
    })

export const comprarProducto = (idProducto) => {

    const producto = productosEnStock.find((producto) => producto.id === idProducto)

    const { nombre, precio, imagen, id } = producto

    const productoCarrito = carrito.find((producto) => producto.id === idProducto)

    if(productoCarrito === undefined){
        const nuevoProductoCarrito = {
            id: id,
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        }

    carrito.push(nuevoProductoCarrito)
    sessionStorage.setItem("carrito", JSON.stringify(carrito) )
    }else{
        const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto)

        carrito[indexProductoCarrito].cantidad++
        carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad

        sessionStorage.setItem("carrito", JSON.stringify(carrito))
    }
    carrito = JSON.parse(sessionStorage.getItem("carrito"))

    alert(`Se ha agregado al carrito el siguiente producto: ${nombre}`)

}

const ArmarCarrito = () => {

    listaCarrito.innerHTML = ''
    carrito.forEach(producto => {
    const { imagen, nombre, cantidad, precio, id } = producto
    let body = document.createElement("tr")

    body.className = "producto__carrito"

    body.innerHTML = `
    <th><img id="fotoProductoCarrito" src="${imagen}" class="card-img-top"</th>
    <td class="p-3">${nombre}</td>
    <td class="p-3">
    <button id="-${id}" class="btn btn-secondary" class="p-5">-</button>
    </td>
    <td class="p-3">${cantidad}</td>
    <td class="p-3">
    <button id="+${id}" class="btn btn-secondary" class="p-5">+</button>
    </td>     
    <td class="p-3">${precio /cantidad}</td>
    <td class="p-3">${precio}</td>
    <td class="p-3">
        <button id="eliminar-${id}" class="btn btn-danger">Eliminar</button>
    </td>
    
    `;

    listaCarrito.append(body)
    
    const btnAgregar = document.getElementById(`+${id}`)
    const btnRestar = document.getElementById(`-${id}`)
    const btnEliminar = document.getElementById(`eliminar-${id}`)
    const btnCerrarCarrito = document.getElementById("cerrarCarrito");





    btnAgregar.addEventListener("click", () => aumentarCantidad(id))
    btnRestar.addEventListener("click", () => restarCantidad(id))
    btnEliminar.addEventListener("click", () => eliminarProducto(id))
    btnCerrarCarrito.addEventListener("click", () => {
        carritoTable.style.display = "none"
    })
    
});

ArmarFooter()
}
const ArmarFooter = () => {

    if(carrito.length > 0){
        footCarrito.innerHTML = ""

        let footer = document.createElement("tr")

        footer.innerHTML = `
        <th><b>Total a Abonar:</b></th>
        <td class="p-5"></td>
        <td class="p-5">${generarTotales().costoTotal}</td>
        `

        footCarrito.append(footer)
    }else{
        footCarrito.innerHTML = "<h3>Carrito Vacio</h3>"
    }

}


const generarTotales = () => {
    const costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0)

    return {
        costoTotal: costoTotal,
        cantidadTotal: cantidadTotal
    }
}

// sumar cantidad del carrito
const aumentarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad

    carrito[indexProductoCarrito].cantidad++
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad

    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    ArmarCarrito()

}

// Restar cantidad del carrito
const restarCantidad = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad;

    carrito[indexProductoCarrito].cantidad--;

    if (carrito[indexProductoCarrito].cantidad <= 0) {
        carrito[indexProductoCarrito].cantidad = 1; // Establecer un mínimo de 1 producto
    }

    carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad;

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    ArmarCarrito();
}


// Elminar del carrito
const eliminarProducto = (id) => {
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id);
    
    if (indexProductoCarrito !== -1) {
        carrito.splice(indexProductoCarrito, 1);
        sessionStorage.setItem("carrito", JSON.stringify(carrito));
        ArmarCarrito();
    }
};