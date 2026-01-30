const API_URL = "http://localhost:3000/users";
const registerForm = document.getElementById("registerForm")
const registerMsg = document.getElementById("registerMsg")

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    
    try{
        //verificar que el usuario no exista
        const checkResponse  = await fetch(`${API_URL}?username=${newUsername}`);
        const existingUsers = await checkResponse.json ();
        
        if (existingUsers.length > 0 ){
            registerMsg.textContent = "el usuario ya existe";
            registerMsg.className = "text-danger";
            return;
        }
        //crear usuario nuevo
        const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            username: newUsername,
            password: newPassword,
            role: "user"
        })
        });


        const newUser = await response.json();

        //guardar automaticamente 
        localStorage.setItem("session", JSON.stringify({
            id : newUser.id,
            username : newUser.username,
            role : newUser.role
        }));

        registerMsg.textContent = "registro existoso";
        window.location.href = "./menu.html";
        registerMsg.className = "text-success";

    }catch(error) {
        console.error("error al registrar: ", error);
        registerMsg.textContent = "error al registrar el usuario";
        registerMsg.className = "text-danger";
    }
});