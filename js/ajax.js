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
        if(10 >= data.thing.graficos > 0 && 10 >= data.thing.bandaSonora > 0 && 10 >= data.thing.gameplay > 0 && 10 >= data.thing.argumento > 0){
            if(data.thing.graficos && data.thing.bandaSonora && data.thing.gameplay && data.thing.argumento){
                fetch(URLRest, {
                    "method": "POST",
                    "headers": {"Content-Type": "application/json"},
                    "body": JSON.stringify(data)
                }).then(agregarElemento);
            }
            else{
                alert("hay un campo vacio");
            }
        }
        else{
            alert("el puntaje tiene que ser entre 1 y 10");
        }
    }
    function agregarBotones(){
        //a hacer
    }
    refresh();
    function refresh(){
        console.log("6 veces?");
        fetch(URLRest).then(resp=>{
            resp.json().then(objeto=>{
                objeto.resenas.forEach(reviews=>{
                    valores = reviews.thing;
                    let nuevaRow = crearFila(false, valores, reviews._id);
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
    function crearFila(esLocal, valores, id){
        let nuevaFila = document.createElement("tr");
        let td = [];
        let botonBorrar = document.createElement("button");
        botonBorrar.innerHTML = "X";
        let botonEditar = document.createElement("button");
        botonEditar.innerHTML = "editar";
        if(esLocal==true){
            let a = 0;
            inputs.forEach(input=>{
                td[a] = document.createElement("td");
                td[a].innerHTML = input.value;
                nuevaFila.appendChild(td[a]);
                a++;
            })
            fetch(URLRest).then(respuestaV2=>{
                respuestaV2.json().then(final=>{
                    let max = final.resenas.length;
                    id = final.resenas[max-1]._id;
                    console.log(id);
                })
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
        botonBorrar.addEventListener("click", ()=>{
            borrarRest(id, nuevaFila);
        })
        tdTotal = totalTd(td);
        nuevaFila.appendChild(tdTotal);
        nuevaFila.appendChild(botonEditar);
        nuevaFila.appendChild(botonBorrar);
        return nuevaFila;
    }
    function agregarElemento(){
        let nuevaRow = crearFila(true);
        document.querySelector("tbody").appendChild(nuevaRow);
    }

    function borrarRest(ultraURL, tr){
        ultraURL = URLRest + "/" + ultraURL;
        fetch(ultraURL, {
            "method": "DELETE",
            "mode": "cors",
            "headers": {"Content-Type": "application/json"}
        });
        tr.remove();
    }
    // function hardReset(){
    //     document.querySelector("tbody").innerHTML = "";
    //     refresh();
    // }
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
