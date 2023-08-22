import { eliminarProducto } from "./admin.js"
import { comprarProducto } from "./carrito.js"

const userLogin = document.getElementById("userLogin")
const divProductos = document.getElementById("productos")
const filtroInput = document.getElementById("filter__input")
const filtroLista = document.getElementById("filter__lista")
const filtroNombre = document.getElementById("filter__nombre")
const filtroPrecio = document.getElementById("filter__precio")


export let productosEnStock = JSON.parse(localStorage.getItem("productos"))
let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))

document.addEventListener("DOMContentLoaded", () => {

  if(usuarioLogeado === null){
    const a = document.createElement("a")
    a.href = "./html/usuarios.html"
    a.innerHTML = "Login"
    userLogin.appendChild(a)
  }else{
    const p = document.createElement("p")
    const close = document.createElement("button")

    p.innerHTML = `Bienvenido ${usuarioLogeado.user}`
    close.id = "cerrar__sesion"
    close.innerHTML = "cerrar sesion"
    close.addEventListener("click", () => {
      alert(`Gracias por visitar nuestra tienda ${usuarioLogeado.user}. Usuario deslogeado`)

      sessionStorage.removeItem("usuario")
      location.reload()
    })
    userLogin.appendChild(p)
    userLogin.appendChild(close)
  }


  generarCardsProductos(productosEnStock)
})

export const generarCardsProductos = (productos) => {
    divProductos.innerHTML = "";
  
    productos.forEach((producto) => {

    const { imagen, nombre, categoria, precio, id } = producto
     
      let card = document.createElement("div");
      card.className = "producto";
      card.innerHTML = `
      <div class="card" >
      <img class="card-img-top" src="${imagen}" alt="Card image cap">
      <div class="card-body">
      <p class="card-title">${nombre}</p>
      <p class="card-text">Categoria: ${categoria}</p>
  
      <p class="card-text">Precio: <b>$${precio}</b></p>
      <button id="btn${id}" class="btn btn-secondary">Comprar</button>

      ${
        usuarioLogeado?.admin === true ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`  : ""
        
      }
  
      </div>
      </div>`;
  
      divProductos.appendChild(card);

      const btnComprar = document.getElementById(`btn${id}`)
      btnComprar.addEventListener("click", () => comprarProducto(id))

      if(usuarioLogeado?.admin === true){
        const btnEliminar = document.getElementById(`eliminar${id}`)
        btnEliminar.addEventListener("click", () => eliminarProducto(id))
      }
      
      
  
    });
  };


   // Filtro por input del usuario
filtroInput.addEventListener("keyup", (e) => {
  const productosFilter = productosEnStock.filter((producto) => producto.nombre.toLowerCase().includes(e.target.value))

  productosEnStock = productosFilter

  if(e.target.value !== ""){
    generarCardsProductos(productosFilter)
  }else{
    productosEnStock = JSON.parse(localStorage.getItem("productos"))
    generarCardsProductos(productosEnStock)
  }

})

// Filtro por click en las distintas categaorias 

filtroLista.addEventListener("click", (e) => {
  let productosFiltro;

  if (e.target.innerHTML === "Todos") {
    productosFiltro = JSON.parse(localStorage.getItem("productos"));
  } else {
    productosFiltro = productosEnStock.filter((producto) =>
      producto.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase())
    );
  }

  generarCardsProductos(productosFiltro);
})

// Filtro por nombre
filtroNombre.addEventListener("click", (e) => {
  filtrarPorNombre(e.target.innerHTML)

})

//Filtro por nombre AZ - ZA

const filtrarPorNombre = (orden) => {
  let productos

  if(orden === "A-Z"){
    productos = productosEnStock.sort((a, b) => {
      if(a.nombre.toLowerCase() > b.nombre.toLowerCase()){
        return 1
      }else if(a.nombre.toLowerCase() < b.nombre.toLowerCase()){
        return -1
      }else{
        return 0
      }
    })
  }else if(orden === "Z-A"){
    productos = productosEnStock.sort((a, b) => {
      if(a.nombre.toLowerCase() < b.nombre.toLowerCase()){
        return 1
      }else if(a.nombre.toLowerCase() > b.nombre.toLowerCase()){
        return -1
      }else{
        return 0
      }


    })
  }
  generarCardsProductos(productos)

}

// Filtro por precio ascendente y descendente

filtroPrecio.addEventListener("click", (e) => {

  const orden = e.target.innerHTML
  let productos

  if(orden === "Menor Precio"){
    productos = productosEnStock.sort((a, b) => a.precio - b.precio)
  }else if(orden === "Mayor Precio"){
    productos = productosEnStock.sort((a, b) => b.precio - a.precio)
  }

  generarCardsProductos(productos)

})

