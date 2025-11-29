function obtenerImagen(modulo) {
    switch (modulo.toLowerCase()) {
        case "cloud": return "assets/cloud.jpeg";
        case "apis": return "assets/apis.png";
        case "fullstack": return "assets/fullstack.png";
        case "data": return "assets/data.jpeg";
        default: return "assets/default.png";
    }
}

async function cargarCurso() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    const curso = await apiGet(`/cursos/${id}`);

    document.getElementById("curso-nombre").innerText = curso.nombre;
    document.getElementById("curso-descripcion").innerText = curso.descripcion;
    document.getElementById("curso-modulo").innerText = curso.modulo;

    const img = obtenerImagen(curso.modulo);
    document.getElementById("curso-imagen").src = img;
}

async function marcar(estado) {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get("id");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const resp = await apiPost(`/progreso/marcar?usuarioId=${usuario.id}&cursoId=${cursoId}&estado=${estado}`);

    document.getElementById("curso-msg").innerText =
        estado === "completado"
            ? "¡Curso completado! Insignia generada en tu perfil."
            : "Progreso registrado.";
}
