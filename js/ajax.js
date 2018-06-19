let container = document.querySelector(".js-container");
document.addEventListener("DOMContentLoaded", home);
document.querySelector(".flex-nav").querySelectorAll("div")[0].addEventListener("click", home);
document.querySelector(".flex-nav").querySelectorAll("div")[2].addEventListener("click", subs);
document.querySelector(".flex-nav").querySelectorAll("div")[1].addEventListener("click", post);
//podria ser una unica funcion :(
function post(){
    fetch("posts.html").then(respuesta=>{
        console.log("funciona");
        respuesta.text().then(regreso=>{
            console.log("funcionax2");
            container.innerHTML = regreso;
            agregarAJAXArticulos();
        })
    })
}
function home(){
    fetch("home.html").then(respuesta=>{
        console.log("funciona");
        respuesta.text().then(regreso=>{
            console.log("funcionax2");
            container.innerHTML = regreso;
            agregarAJAXArticulos();
        })
    })
}
function subs(){
    fetch("subs.html").then(respuesta=>{
        console.log("funciona");
        respuesta.text().then(regreso=>{
            console.log("funcionax2");
            container.innerHTML = regreso;
            agregarAJAXArticulos();
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

function agregarAJAXArticulos(){
    let articulos = container.querySelectorAll("article");
    let urlResena;
    articulos.forEach(a =>{
        a.addEventListener("click", function(){  
            urlResena = "resenas/" + a.querySelector(".nombreHidden").innerHTML + ".html";
            fetch(urlResena).then(res =>{
                res.text().then(final =>{
                    container.innerHTML = final;
                    console.log(urlResena);
                })
            })
        })
    })
}

