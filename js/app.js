const carrito = document.querySelector('#carrito')
const listaCarrito = document.querySelector('#lista-carrito tbody')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarrito = document.querySelector('#vaciar-carrito')
let cursosCart = []




loadEventListener()

function loadEventListener() {
    
    listaCursos.addEventListener('click', identifyCurso)

    carrito.addEventListener('click', deleteCurso)

    vaciarCarrito.addEventListener('click', cleanHtml)
}

function identifyCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        readCurso(e.target.parentElement.parentElement);
    }

}

function deleteCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const idCurso = e.target.getAttribute('data-id')
        cursosCart = cursosCart.filter(curso => curso.id !== idCurso)
        crearHtml()
    }
    
}

function readCurso(curso) {
    const infoCurso = {
        image: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        autor: curso.querySelector('p').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1,
        id: curso.querySelector('.agregar-carrito').getAttribute('data-id')
    }

    const existe = cursosCart.some(curso => curso.id === infoCurso.id)


    if (existe) {
        const cursos = cursosCart.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            } else {
                return curso
            }
        })
        cursosCart = [...cursos]
    } else {
        cursosCart = [...cursosCart, infoCurso]
    }

    crearHtml()
}

function crearHtml() {

    cleanHtml()

    cursosCart.forEach(curso => {
        const itemCart = document.createElement('tr')
        const {image, titulo, precio, cantidad, id} = curso
        itemCart.innerHTML = `
            <td>
                <img src="${image}" width='100'>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `

        listaCarrito.appendChild(itemCart)
    });

}

function cleanHtml() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}