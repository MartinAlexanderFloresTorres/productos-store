/*===== loader ===== */
const loader = document.querySelector(".loader");
window.addEventListener("load", () => (loader.style.display = "none"));

/*===== toogle menu ===== */
const menu = document.querySelector(".header__menu");
const navegacion = document.querySelector(".header__navegacion");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".header__close");

const toogle_header = () => {
    menu.addEventListener("click", () => {
        navegacion.classList.toggle("active");
        overlay.classList.toggle("active");
    });
    close.addEventListener("click", () => {
        navegacion.classList.remove("active");
        overlay.classList.remove("active");
    });
    navegacion.addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "A") {
            navegacion.classList.remove("active");
            overlay.classList.remove("active");
        }
    });
    overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
        navegacion.classList.remove("active");
    });
};
toogle_header();

/*===== SCROLL BOXSHADOW ===== */
const header = document.querySelector(".header-contenedor");
const scroll = () => {
    document.addEventListener("scroll", (e) => {
        const valor_scroll = window.scrollY;
        if (valor_scroll > 100) {
            header.style.boxShadow = "0 0 15px 1px rgba(0,0,0,0.3)";
        } else {
            header.style.boxShadow = "none";
        }
    });
};
scroll();

/*===== TOGGLE CARRITO ===== */
const carrito_icono = document.querySelector(".header__cart");
const carrito = document.querySelector(".carrito");
const iconoClose = document.querySelector(".carrito__close");

const toggleCard = () => {
    carrito_icono.addEventListener("click", () => {
        carrito.classList.toggle("active");
    });
    iconoClose.addEventListener("click", () => {
        carrito.classList.remove("active");
    });
};
toggleCard();

/*===== agregar carrito ===== */
const agregar = document.querySelectorAll(".agregar");
const carritoCantidad = document.querySelector(".header__indice");
const carritoCards = document.querySelector(".carrito__cards");
const btnEliminar = document.querySelector(".producto__eliminar");

let cantidad = 1;
let producto;

const carritoProducto = () => {
    producto = `
    <div class="producto">
    <div class="producto__imagen"><img class="producto__img" src="src/img/backpackMan.png"" alt="imagen de hombre"></div>
    <div class="producto__info">
        <h2 class="producto__title">Producto - ${cantidad}</h2>
        <p class="producto__costo">S/.<span class="costo">${
            55 * cantidad
        }</span></p>
        <p class="producto__costoReal">S/.${cantidad * 110}</p>
        <div class="producto__iconos">
            <div class="producto__cantidad">
                <i class="bx bx-minus producto__menos"></i>
                <p class="producto__numero">1</p>
                <i class="bx bx-plus producto__mas"></i>
            </div>
            <i class="bx bx-trash-alt producto__eliminar"></i>
        </div>
    </div>
    </div>
    `;
};

let costoProducto;
let total;

const agregadoExitosamente = document.querySelector(".agregadoExitosamente");
const cantidadDeCarrito = () => {
    carritoProducto();
    agregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            carritoCantidad.innerHTML = cantidad;
            cantidad++;
            agregadoExitosamente.classList.add("active");
            setTimeout(() => {
                agregadoExitosamente.classList.remove("active");
            }, 1300);
            document.querySelector(".carrito__cards").innerHTML += producto;

            const costo = document.querySelectorAll(".costo");
            costo.forEach((element, i) => {
                costoProducto = Number(element.textContent);
                total = costoProducto * (i + 1);
                document.querySelector(".cantidad__total").innerHTML = total;
                document.querySelector(".cantidad__producto").innerHTML =
                    cantidad - 1;
            });
            document
                .querySelector(".carrito__vaciar")
                .addEventListener("click", () => {
                    document.querySelector(".carrito__cards").innerHTML = "";
                    carritoCantidad.innerHTML = "";
                    cantidad = 1;
                    document.querySelector(".cantidad__total").innerHTML =
                        "0.00";
                    document.querySelector(".cantidad__producto").innerHTML =
                        "0";
                });
            carritoProducto();
        });
    });
};
cantidadDeCarrito();
