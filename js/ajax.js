let container = document.querySelector(".js-container");
document.addEventListener("DOMContentLoaded", function(){
    fetch("home.html").then(respuesta=>{
        console.log("funciona");
        respuesta.text().then(regreso=>
            container.innerHTML = regreso)
    })
})