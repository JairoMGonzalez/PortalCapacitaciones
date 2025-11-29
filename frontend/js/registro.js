async function registrar() {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    if (!nombre || !correo || !password) {
        msg.innerText = "Todos los campos son obligatorios.";
        return;
    }

    try {
        const res = await apiPost("/auth/registro", {
            nombre,
            correo,
            password,
            rol: "USER" // rol por defecto
        });

        if (res && res.id) {
            msg.style.color = "green";
            msg.innerText = "Usuario creado correctamente. Redirigiendo...";

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            msg.innerText = "No se pudo registrar el usuario.";
        }

    } catch (e) {
        msg.innerText = "Error al registrar. Verifica los datos.";
    }
}
