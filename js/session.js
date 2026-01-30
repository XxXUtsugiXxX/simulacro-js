//verificar rol y session
function checkSession(requiredRol){
    const session = localStorage.getItem("session");

    if(!session){
        //no hay sesion entonces redirigir a login
        window.location.href = "index.html";
        return;
    }

    const user = JSON.parse(session);

    //si el rolno coincide con la vista redirigir a login
    
    if(user.role != requiredRol){
        window.location.href = "index.html"
    }
}