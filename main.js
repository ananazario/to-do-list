let listaDeElementos = []

const form = document.querySelector('[data-form]');
const inputForm = document.querySelector('[data-inputForm]')
const listaItens = document.querySelector('[data-listaDeItens]')
const listaTarefasFeitas = document.querySelector('[data-tarefasFeitas]')

form.addEventListener("submit", function(event) {
    event.preventDefault()
    salvarItem();
    mostrarItem();
    inputForm.focus()
})

function salvarItem() {
    const itemCompra = inputForm.value
    const checarDuplicado = listaDeElementos.some((element) => element.valor.toUpperCase() === itemCompra.toUpperCase())

    if(checarDuplicado) {
        window.alert("Item já existente")
    } else {
        listaDeElementos.push({
            valor: itemCompra,
            checar: false
        })
    }
    console.log(listaDeElementos)
}

function mostrarItem() {
    listaItens.innerHTML = ''
    listaTarefasFeitas.innerHTML = ''

    listaDeElementos.forEach((element, index) => {
        if(element.checar) {
            listaTarefasFeitas.innerHTML += `
                <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                    <div>
                        <input type="checkbox" checked class="is-clickable" />  
                        <span class="itens-comprados is-size-5">${element.valor}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-trash is-clickable deletar"></i>
                    </div>
                </li>
            `
        } else {
            listaItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${element.valor}"></input>
                </div>
                <div>
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
        `
        }
    })

    const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

    inputsCheck.forEach((input) => {
        input.addEventListener('click', (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeElementos[valorDoElemento].checar = evento.target.checked
            mostrarItem()
        })
    })
}