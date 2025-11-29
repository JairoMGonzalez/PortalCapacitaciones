// -------------------------------
//  MOSTRAR MENSAJE EN PANTALLA
// -------------------------------
function mostrarMensaje(texto, exito = true) {
    const div = document.getElementById("mensaje-curso");

    div.innerText = texto;
    div.style.display = "block";
    div.style.background = exito ? "#d4edda" : "#f8d7da";
    div.style.color = exito ? "#155724" : "#721c24";

    setTimeout(() => {
        div.style.display = "none";
    }, 3000);
}



// -------------------------------
//  CARGAR LISTA DE CURSOS
// -------------------------------
async function cargarCursos() {
    const tabla = document.getElementById("tabla-cursos");
    tabla.innerHTML = "";

    try {
        const cursos = await apiGet("/cursos");

        cursos.forEach(curso => {
            tabla.innerHTML += `
                <tr>
                    <td>${curso.id}</td>
                    <td>${curso.nombre}</td>
                    <td>${curso.modulo}</td>
                    <td>
                        <button class="btn-editar" onclick="cargarFormulario(${curso.id}, '${curso.nombre}', '${curso.descripcion}', '${curso.modulo}')">Editar</button>
                        <button class="btn-eliminar" onclick="eliminarCurso(${curso.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });

    } catch (e) {
        console.error("Error cargando cursos: ", e);
        mostrarMensaje("Error cargando cursos", false);
    }
}



// -------------------------------
//  CREAR / EDITAR CURSO
// -------------------------------
let editandoId = null;

async function crearCurso() {

    const nombre = document.getElementById("nombre").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const modulo = document.getElementById("modulo").value.trim();
    const msg = document.getElementById("msg");

    if (!nombre || !descripcion || !modulo) {
        msg.style.color = "red";
        msg.innerText = "Todos los campos son obligatorios.";
        mostrarMensaje(" Completa todos los campos", false);
        return;
    }

    const data = { nombre, descripcion, modulo };

    try {
        let res;

        if (editandoId === null) {
            // Crear curso
            res = await apiPost("/cursos", data);
            msg.style.color = "green";
            msg.innerText = `Curso creado correctamente (ID: ${res.id})`;

            mostrarMensaje(" Curso creado correctamente", true);

        } else {
            // Editar curso
            res = await apiPut(`/cursos/${editandoId}`, data);
            msg.style.color = "green";
            msg.innerText = `Curso actualizado correctamente (ID: ${editandoId})`;

            mostrarMensaje(" Curso actualizado", true);
        }

        limpiarFormulario();
        cargarCursos();

    } catch (error) {
        console.error(error);
        msg.style.color = "red";
        msg.innerText = "Error al guardar el curso.";

        mostrarMensaje(" Error al guardar el curso", false);
    }
}



// -------------------------------
//  CARGAR DATOS EN EL FORM PARA EDITAR
// -------------------------------
function cargarFormulario(id, nombre, descripcion, modulo) {

    document.getElementById("nombre").value = nombre;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("modulo").value = modulo;

    editandoId = id;

    document.getElementById("btn-guardar").innerText = "Actualizar";
    document.getElementById("msg").innerText = `Editando curso ID: ${id}`;

    mostrarMensaje(` Editando curso ID ${id}`, true);
}



// -------------------------------
//  ELIMINAR CURSO
// -------------------------------
async function eliminarCurso(id) {

    if (!confirm("¿Seguro que deseas eliminar este curso?")) return;

    try {
        await apiDelete(`/cursos/${id}`);
        cargarCursos();
        mostrarMensaje(" Curso eliminado", true);

    } catch (error) {
        console.error("Error eliminando curso:", error);
        alert("Error al eliminar el curso.");
        mostrarMensaje(" Error al eliminar curso", false);
    }
}



// -------------------------------
//  LIMPIAR FORMULARIO
// -------------------------------
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("modulo").value = "";

    editandoId = null;

    document.getElementById("btn-guardar").innerText = "Guardar";
    document.getElementById("msg").innerText = "";
}
