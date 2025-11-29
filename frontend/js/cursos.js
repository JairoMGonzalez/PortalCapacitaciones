async function cargarCursos() {
    const cont = document.getElementById("listaCursos");
    cont.innerHTML = "";

    const urlParams = new URLSearchParams(window.location.search);
    const moduloFiltro = urlParams.get("modulo");

    let cursos = await apiGet("/cursos");

    // Filtra si viene desde módulos
    if (moduloFiltro) {
        cursos = cursos.filter(c => c.modulo === moduloFiltro);
    }

    cursos.forEach(c => {

        // Asignar imágenes por módulo
        let img = "assets/default.jpg";
        if (c.modulo === "cloud") img = "assets/cloud.jpeg";
        if (c.modulo === "fullstack") img = "assets/fullstack.png";
        if (c.modulo === "apis") img = "assets/apis.png";
        if (c.modulo === "data") img = "assets/data.jpeg";

        cont.innerHTML += `
        <div class="curso-card" onclick="verCurso(${c.id})">

            <img src="${img}" class="curso-img">

            <div class="curso-info">
                <h3>${c.nombre}</h3>
                <p>${c.descripcion}</p>

                <span class="tag-modulo tag-${c.modulo}">
                    ${c.modulo}
                </span>
            </div>
        </div>`;
    });
}

function verCurso(id) {
    window.location.href = "curso.html?id=" + id;
}

cargarCursos();
