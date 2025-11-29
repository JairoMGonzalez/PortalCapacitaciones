function obtenerImagen(modulo) {
    if (!modulo) return "assets/default.png";

    switch (modulo.toLowerCase()) {
        case "cloud": return "assets/cloud.jpeg";
        case "apis": return "assets/apis.png";
        case "fullstack": return "assets/fullstack.png";
        case "data": return "assets/data.jpeg";
        default: return "assets/default.png";
    }
}

async function cargarPerfil() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        console.error("❌ No hay usuario en localStorage.");
        return;
    }

    // Mostrar datos del usuario
    document.getElementById("perfil-nombre").innerText = usuario.nombre;
    document.getElementById("perfil-correo").innerText = usuario.correo;

    /* ==========================================================
       🔵 1️⃣  CARGAR INSIGNIAS
    ========================================================== */
    const contIns = document.getElementById("lista-insignias");
    contIns.innerHTML = "";

    let insignias = [];
    try {
        insignias = await apiGet(`/insignias/usuario/${usuario.id}`);
    } catch (e) {
        console.error("❌ Error cargando insignias:", e);
        contIns.innerHTML = "<p>Error al cargar insignias.</p>";
        return;
    }

    if (!insignias.length) {
        contIns.innerHTML = "<p>No tienes insignias todavía.</p>";
    } else {
        insignias.forEach(i => {

            // ✅ usar correctamente imagenUrl del backend
            const imagen = i.imagenUrl
                ? `assets/${i.imagenUrl}`
                : obtenerImagen(i.curso?.modulo);

            const card = document.createElement("div");
            card.className = "insignia-card";

            card.innerHTML = `
                <img src="${imagen}" class="insignia-img" alt="Insignia">
                <div class="insignia-title">
                    ${i.curso?.nombre ?? "Curso"}
                </div>
            `;

            contIns.appendChild(card);
        });
    }

    /* ==========================================================
       🟢 2️⃣  CARGAR CURSOS COMPLETADOS
    ========================================================== */
    const contCursos = document.getElementById("lista-cursos");
    contCursos.innerHTML = "";

    let progreso = [];
    try {
        progreso = await apiGet(`/progreso/usuario/${usuario.id}`);
    } catch (e) {
        console.error("❌ Error cargando progreso:", e);
        contCursos.innerHTML = "<p>Error al cargar progreso.</p>";
        return;
    }

    const completados = progreso.filter(p => p.estado === "completado");

    if (!completados.length) {
        contCursos.innerHTML = "<p>No has completado cursos.</p>";
    } else {
        completados.forEach(p => {

            const imgCurso = obtenerImagen(p.curso?.modulo);

            const card = document.createElement("div");
            card.className = "perfil-curso-card";

            card.innerHTML = `
                <img src="${imgCurso}" class="perfil-curso-img">
                <div>
                    <div class="perfil-curso-title">${p.curso.nombre}</div>
                    <span class="perfil-curso-modulo">${p.curso.modulo}</span>
                </div>
            `;

            contCursos.appendChild(card);
        });
    }
}
