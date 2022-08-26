/* Initial Datas */
let areas = {
    a: null, // Não tem nada
    b: null,
    c: null
}
/* Events */

document.querySelector('.neutralArea').addEventListener('click', (e)=>{
    console.log('Target: ', e.target)
    console.log('currentTarget: ', e.currentTarget)
})



// Próprio Item

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart) // Quando começa a arrastar
    item.addEventListener('dragend', dragEnd) // Quando termina de arrastar
})

// Áreas de Neutral

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);
// Áreas de Drop

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver); // Quando passa por cima (Arrastando)
    area.addEventListener('dragleave', dragLeave); // Quando sai da área dropável
    area.addEventListener('drop', drop); // Quando solta no local | Só funciona quando o dragOver permite
})

/* Functions Item */

function dragStart(e) {
    e.currentTarget.classList.add('dragging')
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging')
}

/* Functions Neutral Área */
function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging'); // Item que está com o dragging
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

/* Functions Área */

function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault(); // Previne que o dragOver bloqueie o dragDrop
        e.currentTarget.classList.add('hover');
    }
}
function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}
function drop(e) {
    e.currentTarget.classList.remove('hover'); // Remove a transparência
    if (e.currentTarget.querySelector('.item') === null) { // Se não há item dentro
        let dragItem = document.querySelector('.item.dragging'); // Item que está com o dragging
        e.currentTarget.appendChild(dragItem); // Entra no elemento e adiciona o item no final | Incluindo seus eventos
        updateAreas();
    }
}


// Logic Functions

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML; // Pega o que está escrito no item
        } else {
            areas[name] = null;
        }
    })

    // Muda a cor para verde quando acerta a combinação
    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    };
}



/*
    - (target) Pega o item que foi clicado;
    - (currentTarget) Pega o item que foi selecionado no querySelector e que foi clicado;
    - (draggable="true") Informa ao HTML que o item pode ser arrastável;

    // Próprio Item

    document.querySelectorAll('.item').forEach(item => {
        item.addEventListener('dragstart', dragStart) // Quando começa a arrastar
        item.addEventListener('dragend', dragEnd) // Quando termina de arrastar
    })
------------------------------------------------------------------------------------------------
    // Áreas de Drop

    document.querySelector('.area').forEach(area => {
        area.addEventListener('dragover', dragOver) // Quando passa por cima (Arrastando)
        area.addEventListener('dragleave', dragLeave) // Quando sai da área dropável
        area.addEventListener('drop', drop) // Quando solta no local | Só funciona quando o dragOver permite
            * Ex: 
                    function dragOver(e) {
                        e.preventDefault() // Previne que o dragOver bloqueie o dragDrop
                        console.log('Passou por cima')
                    }
        })
----------------------------------------------------------------------------------------   

- (appendChild(dragItem)) Entra no elemento e adiciona o item no final | Incluindo seus eventos;



*/