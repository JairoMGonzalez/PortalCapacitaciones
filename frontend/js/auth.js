async function login() {

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    error.innerText = "";

    if (!correo || !password) {
        error.innerText = "Por favor completa todos los campos.";
        return;
    }

    try {
        const data = await apiPostJSON("/auth/login", { correo, password });

        if (!data || !data.id) {
            error.innerText = "Credenciales incorrectas intente de nuevo.";
            return;
        }

        // Guardar usuario
        localStorage.setItem("usuario", JSON.stringify(data));

        // Redirigir
        window.location.href = "modulos.html";

    } catch (e) {
        error.innerText = "Credenciales incorrectas intente de nuevo.";
        console.error(e);
    }
}
