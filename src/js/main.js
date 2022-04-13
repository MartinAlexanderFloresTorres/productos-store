/*===== loader ===== */
const loader = document.querySelector(".loader");
window.addEventListener("load", () => (loader.style.display = "none"));

/*===== toogle menu ===== */
const menu = document.querySelector(".header__menu");
const body = document.querySelector("body");
const navegacion = document.querySelector(".header__navegacion");
const navegacion_enlaces = document.querySelectorAll(".header__navegacion a");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".header__close");

navegacion_enlaces.forEach((item) => {
    item.addEventListener("click", () => {
        navegacion_enlaces.forEach((e) => {
            e.classList.remove("active");
        });
        item.classList.add("active");
    });
});
const toogle_header = () => {
    menu.addEventListener("click", () => {
        navegacion.classList.add("active");
        overlay.classList.add("active");
        body.classList.add("active");
    });
    close.addEventListener("click", () => {
        navegacion.classList.remove("active");
        overlay.classList.remove("active");
        body.classList.remove("active");
    });
    navegacion.addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "A") {
            navegacion.classList.remove("active");
            overlay.classList.remove("active");
            body.classList.remove("active");
        }
    });
    overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
        navegacion.classList.remove("active");
        body.classList.remove("active");
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

//===== validar formulario =====
const formulario = document.querySelector("#formulario");
const btnEnviar = document.querySelector("#btnEnviar");
const email = document.querySelector("#email");
const spinerFormulario = document.querySelector("#spinerFormulario");

document.addEventListener("DOMContentLoaded", iniciarFormulario);

function iniciarFormulario() {
    formulario.addEventListener("submit", enviarFormulario);
}
function mensaje(texto, clase) {
    const parrafo = document.createElement("P");
    parrafo.textContent = texto;
    parrafo.classList.add(clase);
    const parrafoMensaje = document.querySelectorAll(`.${clase}`);
    if (parrafoMensaje.length === 0) {
        formulario.appendChild(parrafo);
    }
}
function enviarFormulario(e) {
    e.preventDefault();
    const er =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (er.test(email.value)) {
        email.style.display = "none";
        btnEnviar.style.display = "none";
        spinerFormulario.style.display = "block";
        const parrafoMensaje = document.querySelector(".error");
        if(parrafoMensaje){
            parrafoMensaje.remove()
        }
        setTimeout(() => {
            spinerFormulario.style.display = "none";
            mensaje("Datos enviados correctamente", "correcto");
            const parrafoMensaje = document.querySelector(".correcto");
            setTimeout(() => {
                email.style.display = "block";
                btnEnviar.style.display = "block";
                formulario.reset();
                parrafoMensaje.remove();
            }, 2500);
        }, 2500);
    } else {
        mensaje("Email no valido", "error");
        const parrafoMensaje = document.querySelector(".error");
        setTimeout(() => {
            parrafoMensaje.remove();
        }, 2500);
    }
}
