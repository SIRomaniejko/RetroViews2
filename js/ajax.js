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
function agregarReview(p, div){
    div.addEventListener("click", function(){
        fetch("reviews/" + p).then(respuesta =>{
            respuesta.text().then(texto=>{
                container.innerHTML = texto;
                
            })
        })
    })
}

function agregarAJAXArticulos(){
    let articulos = container.querySelectorAll("article");
    let urlReview;
    articulos.forEach(a =>{
        a.addEventListener("click", function(){  
            urlReview = "reviews/" + a.getAttribute("nombreArticulo") + ".html";
            fetch(urlReview).then(res =>{
                res.text().then(final =>{
                    container.innerHTML = final;
                    if(urlReview === "reviews/rest.html"){
                        creaTuReview();
                    }
                    console.log(urlReview);
                })
            }).catch(a=>console.log(a));
        })
    })
}

let URLRest = "https://web-unicen.herokuapp.com/api/groups/RomaYOli/resenas";

function creaTuReview(){
    document.querySelector("#enviar").addEventListener("click", ()=>{
        console.log("funciona?")
        let inputs = document.querySelectorAll("input");
        let data = {
            "thing": {
                "nombre": inputs[0].value,
                "graficos": inputs[1].value,
                "banda sonora": inputs[2].value,
                "gameplay": inputs[3].value,
                "argumento": inputs[4].value
            }
        }
        fetch(URLRest, {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(data)
        })
    })
    function borrarPagina(ultraURL){
        ultraURL = URLRest + "/" + ultraURL;
        fetch(ultraURL, {
            "method": "DELETE",
            "mode": "cors",
            "headers": {"Content-Type": "application/json"}
        })
    }
    function aLaVerga(){
        fetch(URLRest).then(resp=>{
            resp.json().then(a=>{
                a.resenas.forEach(reviews =>{
                    console.log(reviews._id);
                    borrarPagina(reviews._id);
                })
            })
        })
    }
}
