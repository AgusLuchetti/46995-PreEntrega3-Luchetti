import { generarCardsProductos, productosEnStock } from "./inicio.js";

const btnAgregar = document.getElementById("agregar__producto")
const usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))
const agregarProductos = document.getElementById("form__agregar")
const divProductos = document.getElementById("productos");
const btnModificar = document.getElementById("btn__modificar")

export const eliminarProducto = (id) => {

    const productoEliminar = productosEnStock.findIndex(( producto ) => producto.id === id)
    productosEnStock.splice(productoEliminar, 1)
    localStorage.setItem("productos", JSON.stringify(productosEnStock))
    generarCardsProductos(JSON.parse(localStorage.getItem("productos")))  

}


class Productos {
    constructor(nombre, precio, imagen, categoria){
        this.id = generarId()
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
        this.categoria = categoria
    }
}


const generarId = () => {
    const id = productosEnStock.map((producto) => { return producto.id })

    const max = Math.max(...id) + 1
    return max
}

usuarioLogeado?.admin === true ? (btnAgregar.style.display = "block") : (btnAgregar.style.display = "none")

usuarioLogeado?.admin === true ? (btnModificar.style.display = "block") : (btnModificar.style.display = "none")

btnAgregar.addEventListener("click", () => generarVistaAgregar())

const generarVistaAgregar =() => {
    agregarProductos.innerHTML = ""

    agregarProductos.style.display = "block"
    
    const form = document.createElement("form")

    form.innerHTML = `
    <div class="mb-3">
    <label for="nombre">Nombre:</label>
    <input type="text" name="" id="nombre" />
  </div>
  <div class="mb-3">
    <label for="precio">Precio:</label>
    <input type="text" name="" id="precio" />
  </div>
  <div class="mb-3">
    <label for="imagen">Imagen:</label>
    <input type="text" name="" id="imagen" />
  </div>
  <div class="mb-3">
    <label for="categoria">Categoria:</label>
    <input type="text" name="" id="categoria" />
  </div>
<button id="cargar" class="btn btn-secondary" type="button">Cargar</button>
<button id="cerrar" class="btn btn-danger" type="button"> X Cerrar</button>

    `
    agregarProductos.appendChild(form)

    const btnCargar = document.getElementById("cargar")
    btnCargar.addEventListener("click", (e) => {
        e.preventDefault()
        guadarProducto()
    })
    const btnCerrar = document.getElementById("cerrar")
    btnCerrar.addEventListener("click", (e) => {
        agregarProductos.style.display = "none"
    })

}

const guadarProducto = () => {
    const nombre = agregarProductos.children[0][0].value
    const precio = agregarProductos.children[0][1].value
    const imagen = agregarProductos.children[0][2].value
    const categoria = agregarProductos.children[0][3].value

    if(nombre !== "" && precio !== "" && imagen !== "" && categoria !== ""){
        const nuevoProducto = new Productos(nombre, precio, imagen, categoria)

        productosEnStock.push(nuevoProducto)

        localStorage.setItem("productos", JSON.stringify(productosEnStock))

        agregarProductos.style.display = "none"

        generarCardsProductos(productosEnStock)


    }else{
        alert("algun/os valores no estan completos")
    }
}


btnModificar.addEventListener("click", () => {modificarProductosCard()})

const modificarProductosCard = () => {

    divProductos.innerHTML = "";

    productosEnStock.forEach((producto) => {
      let card = document.createElement("div");
      card.className = "producto";
      card.innerHTML = `
        <div class="card">
        <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
        <p>Imagen: <input type="text" value="${producto.imagen}"></p>
        <p>Nombre: <input type="text" value="${producto.nombre}"></p>
        <p>Precio: <input type="text" value="${producto.precio}"></p>
        <p>Categoria: <input type="text" value="${producto.categoria}"></p>
        <div class="card-body">
        <button id="boton${producto.id}" class="btn btn-secondary">Modificar</button>
        <button id="cancelar${producto.id}" class="btn btn-danger">Cancelar</button>
        </div>
    
        </div>`;
  
      divProductos.appendChild(card);
      const btnAceptar = document.getElementById(`boton${producto.id}`)
      const btnCancelar = document.getElementById(`cancelar${producto.id}`)
  
      btnAceptar.addEventListener("click", (e) => modificarProductos(e,producto.id))
      btnCancelar.addEventListener("click", () => generarCardsProductos(productosEnStock))
    });
  

}



const modificarProductos = (e, id) => {
    const productoIndice = productosEnStock.findIndex((producto) => producto.id === id)

    const imagen = e.target.parentElement.parentElement.children[1].children[0].value
    const nombre = e.target.parentElement.parentElement.children[2].children[0].value
    const precio = e.target.parentElement.parentElement.children[3].children[0].value
    const categoria = e.target.parentElement.parentElement.children[4].children[0].value

    productosEnStock[productoIndice].nombre = nombre
    productosEnStock[productoIndice].precio = precio

    productosEnStock[productoIndice].imagen = imagen
    productosEnStock[productoIndice].categoria = categoria


    localStorage.setItem("productos", JSON.stringify(productosEnStock))
    generarCardsProductos(productosEnStock)

}