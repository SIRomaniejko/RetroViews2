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
    let inputs = document.querySelectorAll("input");
    document.querySelector("#enviar").addEventListener("click", enviarData);
    document.querySelector("#enviarX3").addEventListener("click", ()=>{
        for(let a = 0; a < 3; a++){
            enviarData();
        }
    })
    function enviarData(){
        agregarElemento();
        console.log("funciona?")
        let data = {
            "thing": {
                "nombre": inputs[0].value,
                "graficos": inputs[1].value,
                "bandaSonora": inputs[2].value,
                "gameplay": inputs[3].value,
                "argumento": inputs[4].value
            }
        }
        fetch(URLRest, {
            "method": "POST",
            "headers": {"Content-Type": "application/json"},
            "body": JSON.stringify(data)
        })
    }
    refresh();
    function refresh(){
        console.log("6 veces?");
        fetch(URLRest).then(resp=>{
            resp.json().then(objeto=>{
                objeto.resenas.forEach(reviews=>{
                    valores = reviews.thing;
                    let nuevaRow = crearFila(false, valores);
                    document.querySelector("tbody").appendChild(nuevaRow);
                })
            })
        })
    }
    function totalTd(arr){
        let total = 0;
        for(let a = 1; a < 5; a++){
            total += parseFloat(arr[a].innerHTML, 10);
        }
        total = total/4;
        let regreso = document.createElement("td");
        regreso.innerHTML = total;
        return regreso;
    }
    function crearFila(esLocal, valores){
        let nuevaFila = document.createElement("tr");
        let td = [];
        if(esLocal==true){
            let a = 0;
            inputs.forEach(input=>{
                td[a] = document.createElement("td");
                td[a].innerHTML = input.value;
                nuevaFila.appendChild(td[a]);
                a++;
            })
            
        }
        else{
            let a = 0;
            arrValores = [valores.nombre, valores.graficos, valores.bandaSonora, valores.gameplay, valores.argumento];
            arrValores.forEach(valorReview=>{
                td[a] = document.createElement("td");
                td[a].innerHTML = valorReview;
                nuevaFila.appendChild(td[a]);
                a++;
            })
        }
        tdTotal = totalTd(td);
        nuevaFila.appendChild(tdTotal);
        return nuevaFila;
    }
    function agregarElemento(){
        let nuevaRow = crearFila(true);
        document.querySelector("tbody").appendChild(nuevaRow);
    }

    function borrarRest(ultraURL){
        ultraURL = URLRest + "/" + ultraURL;
        fetch(ultraURL, {
            "method": "DELETE",
            "mode": "cors",
            "headers": {"Content-Type": "application/json"}
        })
    }
    
    document.querySelector("#pija").addEventListener("click", aLaVerga);
    function aLaVerga(){
        fetch(URLRest).then(resp=>{
            resp.json().then(a=>{
                a.resenas.forEach(reviews =>{
                    console.log(reviews._id);
                    borrarRest(reviews._id);
                })
            })
        })
    }
}
