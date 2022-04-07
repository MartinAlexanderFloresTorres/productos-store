/*===== TOGGLE CARRITO ===== */
const agregadoExitosamente = document.querySelector(".agregadoExitosamente");
const carrito_icono = document.querySelector(".header__cart");
const carrito = document.querySelector(".carrito");
const iconoClose = document.querySelector(".carrito__close");


const toggleCard = () => {
    carrito_icono.addEventListener("click", () => {
        carrito.classList.toggle("active");
        body.classList.add('active')
        agregadoExitosamente.classList.add('left')
    });
    iconoClose.addEventListener("click", () => {
        carrito.classList.remove("active");
        body.classList.remove('active')
        agregadoExitosamente.classList.remove('left')
    });
};
toggleCard();

/*===== agregar carrito ===== */
const carrito__pagar = document.querySelector('.carrito__pagar');
const indiceHeader = document.querySelector('.header__indice');
const contenedorProductos = document.querySelector(".productos-contenedor");
const carritoCards = document.querySelector(".carrito__cards");
const vaciarCarrito = document.querySelector(".carrito__vaciar");

let nuevoProducto = [];

function cargarListener() {
    contenedorProductos.addEventListener("click", agregarCarrito);
  
    // elimina curso del carrito
    carritoCards.addEventListener("click", eliminarCurso);

    vaciarCarrito.addEventListener("click", () => {
        nuevoProducto = [];
        crearHtml();
        if (nuevoProducto.length === 0) {
            carrito.classList.remove('contents')
            carrito__pagar.style.display = 'none';
        }
    });

    document.addEventListener('DOMContentLoaded', ()=> {
        nuevoProducto = JSON.parse(localStorage.getItem('carrito') || []);
        crearHtml()
    })
}
cargarListener();

//===== agregarCarrito =====
function agregarCarrito(e) {
    if (e.target.classList.contains("agregar")) {
        const producto = e.target.parentElement;
        if (!agregadoExitosamente.classList.contains('active')) {
            agregadoExitosamente.classList.add("active");
            setTimeout(()=>{
                agregadoExitosamente.classList.remove("active");
            },2500)
        }   
        leerDatos(producto);
    }
}

// elimina un curso del carrito
function eliminarCurso(e) {
    const dataId = parseInt(e.target.getAttribute("data-id"));
    if (e.target.classList.contains("producto__eliminar")) {
        nuevoProducto = nuevoProducto.filter((producto) => {
            return producto.id !== dataId}
        );
        crearHtml();
    }
    if (e.target.classList.contains("producto__mas")) {
        const existe = nuevoProducto.some((producto) => {
            return producto.id === dataId;
        });
        if (existe) {
            const copiaProducto = nuevoProducto.map((producto) => {
                if (producto.id === dataId) {
                    producto.cantidad++;
                    return producto;
                } else {
                    return producto;
                }
            });
            nuevoProducto = [...copiaProducto];
        } else {
            nuevoProducto = [...nuevoProducto];
        }
        crearHtml();
    }
    if (e.target.classList.contains("producto__menos")) {
        const existe = nuevoProducto.some((producto) => {
            return producto.id === dataId;
        });
        if (existe) {
            const copiaProducto = nuevoProducto.map((producto) => {
                if (producto.id === dataId) {
                    if (producto.cantidad > 1) {
                        producto.cantidad--;
                        return producto;
                    } else {
                        return producto;
                    }
                } else {
                    return producto;
                }
            });
            nuevoProducto = [...copiaProducto];
        } else {
            nuevoProducto = [...nuevoProducto];
        }
        crearHtml();
    }
    if (nuevoProducto.length === 0) {
        carrito.classList.remove('contents')
        carrito__pagar.style.display = 'none';
    }
}
//===== leerDatos =====
function leerDatos(producto) {
    const datos = {
        imagen: producto.querySelector(".productos__imagen img").src,
        nombre: producto.querySelector(".producto__nombre").textContent,
        precio: parseInt(producto.querySelector(".producto__precio").textContent),
        id: parseInt(producto.getAttribute("data-id")),
        cantidad: 1,
    };
    const existe = nuevoProducto.some((producto) => producto.id === datos.id);

    if (existe) {
        // actualizamos la cantidad
        const producto = nuevoProducto.map((producto) => {
            if (producto.id === datos.id) {
                producto.cantidad++;
                return producto; // retorna el objecto actualizado
            } else {
                return producto; // retorna el objeto que no son duplicados
            }
        });
        nuevoProducto = [...producto];
    } else {
        // agregamos en curso al carrito
        nuevoProducto = [...nuevoProducto, datos];
    }
    crearHtml();
}
//===== total =====
function totalCompra() {
    let total = 0;
    const resultado = nuevoProducto.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
    document.querySelector(".cantidad__total").textContent = resultado;
}

//===== cantidad__producto =====
function cantidadProducto() {
    let productos = 0;
    nuevoProducto.forEach((item, index) => {
        productos = index + 1;
    });

    if (!indiceHeader.classList.contains('active')) {
        indiceHeader.classList.add('active')
        setTimeout(()=>{
            indiceHeader.classList.remove('active')
        }, 2500)
    }
    
    if (productos != 0) {
        indiceHeader.textContent = productos
    } else {
        indiceHeader.textContent = ''
    }
    document.querySelector(".cantidad__producto").textContent = productos;
}
//===== crearHtml =====
function crearHtml() {
    if (nuevoProducto.length != 0) {
        carrito.classList.add('contents')
        carrito__pagar.style.display = 'block';
    }
    eliminarHtml(); // elimina html
    //===== total =====
    totalCompra();
    cantidadProducto();
    nuevoProducto.forEach((producto) => {
        let { imagen, nombre, precio, id, cantidad } = producto;
        let div = document.createElement("DIV");

        div.innerHTML = `
            <div class="producto">
                <div class="producto__imagen"><img class="producto__img" src="${imagen}" alt="imagen"></div>
                <div class="producto__info">
                    <h2 class="producto__title">${nombre}</h2>
                    <p class="producto__costo">S/.<span class="costo">${precio}</span></p>
                    <p class="producto__costoReal">S/.${precio + 135}</p>
                    <div class="producto__iconos">
                        <div class="producto__cantidad">
                            <i class="bx bx-minus producto__menos" data-id="${id}"></i>
                            <p class="producto__numero">${cantidad}</p>
                            <i class="bx bx-plus producto__mas" data-id="${id}"></i>
                        </div>
                        <i class="bx bx-trash-alt producto__eliminar" data-id="${id}"></i>
                    </div>
                </div>
            </div>
        `;
        carritoCards.appendChild(div);
    });
    guardarLocalStorage()
}
function guardarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(nuevoProducto))
}
function eliminarHtml() {
    while (carritoCards.firstChild) {
        carritoCards.removeChild(carritoCards.firstChild);
    }
}
