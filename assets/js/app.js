const boton = document.querySelector('#boton-agregar');
const input = document.querySelector('#campo');

const total = document.querySelector('#total');
const realizada = document.querySelector('#realizada');
const tbody = document.querySelector('#tbody');

const tareas = [];

boton.addEventListener('click', () => {
    const nuevaTarea = input.value.trim();
    if (nuevaTarea === "") {
        alert("Debes escribir una tarea");
        return;
    }
    tareas.push({ id: Date.now() % 100000, nombre: nuevaTarea });
    input.value = "";
    renderTareas();
});

function renderTareas() {
    let totalMarcados = 0;

    let html = "";

    for (let tarea of tareas) {
        html += `<tr>
                  <th scope="row">${tarea.id}</th>
                  <td>${tarea.nombre}</td>
                  <td><input  type="checkbox" value="" class="finalizada"></td>
                  <td onclick="borrar(${tarea.id})">❌</td>
                </tr>`;
    }
    tbody.innerHTML = html;

    total.innerHTML = `${tareas.length}`;

    // Seleccionar todos los checkboxes con la clase "finalizada"
    const finalizada = document.querySelectorAll(".finalizada");

    finalizada.forEach((checkbox) => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                totalMarcados++;
            } else {
                totalMarcados--;
            }
            realizada.innerHTML = `${totalMarcados}`;
        });
    });
}

function borrar(id) {
    const index = tareas.findIndex((ele) => ele.id == id);
    tareas.splice(index, 1);
    renderTareas();
}
