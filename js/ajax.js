let container = document.querySelector(".js-container");
document.addEventListener("DOMContentLoaded", home);
document.querySelector(".flex-nav").querySelectorAll("div")[0].addEventListener("click", home);

function home(){
    fetch("home.html").then(respuesta=>{
        console.log("funciona");
        respuesta.text().then(regreso=>{
            console.log("funcionax2");
            container.innerHTML = regreso;
            let divs = document.querySelector(".container").querySelectorAll("div");
            for(a of divs){
                let p = divs[a].getElementsByTagName("p")[0];
                agregarResena(p, divs[a]);
            }
        })
    })
}

function posts(){

}

function subscripccion(){

}

function agregarResena(p, div){
    div.addEventListener("click", function(){
        fetch("resenas/" + p).then(respuesta =>{
            respuesta.text().then(texto=>{
                container.innerHTML = texto;
            })
        })
    })
}

