// URL base de la api  falsa
const API_URL = "http://localhost:3000/users";

//capturamos formulario
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errormsg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); //evita recargar la pagina

//obtener valores de formulario
const username =document.getElementById("username").value;
const password = document.getElementById("password").value;

try{
//consultamos la api
    const reponse = await fetch (`${API_URL}?username=${username}&password=${password}`);
    const users = await reponse.json();

    if(username.length > 0){
        const user = users[0];

        //guardar session en local storage
        localStorage.setItem("session", JSON.stringify({
            id: user.id,
            username: user.username,
            role: user.role
        }));

        //redirigimos el rol
        if(user.role === "admin"){
            window.location.href = "./vistas/admin.html";
        }else{
            window.location.href = "./vistas/menu.html";
        }
    }else{
        errorMsg.textContent = "usuario o contraseña incorrecto";
    }
}catch(error){
    console.error("error en login", error);
    errorMsg.textContent="error de conexion con el servidor";
}
});

