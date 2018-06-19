document.querySelector('#submit').addEventListener('click',getDatos);
document.querySelector('#get').addEventListener('click', mostrarTabla);
document.querySelector('#delete').addEventListener('click', borrarTabla);
let baseURL = 'https://web-unicen.herokuapp.com/api/groups/';
let groupID = 'RomaYOli';
let collectionID = '/resenas';
function getDatos(){
    let nombre = document.querySelector('#juego').value;
    let graficos = document.querySelector('#grafico').value;
    let sonido = document.querySelector('#sonido').value;
    let gameplay = document.querySelector('#gameplay').value;
    let argumento = document.querySelector('#arg').value;

    let resenia = {
        "thing":{
            "nombre": nombre,
            "graficos": graficos,
            "sonido": sonido,
            "gameplay": gameplay,
            "argumento": argumento
        }
    };
    cargarTabla(resenia);
}
function mostrarTabla(){
    fetch(baseURL + groupID + collectionID, {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type':'application/json'}
    }).then(function(r){
        if(!r.ok){
            console.log('FAllaste wey');
        }else{
            return r.json();
        }
    })
    .then(function(json){
        let tbody = document.querySelector('#tbody');
        for(let data of json.resenas){
            tbody.innerHTML += '<tr>';
            tbody.innerHTML += '<td>'+data.thing.nombre+'</td>';
            tbody.innerHTML += '<td>'+data.thing.graficos+'</td>';
            tbody.innerHTML += '<td>'+data.thing.sonido+'</td>';
            tbody.innerHTML += '<td>'+data.thing.gameplay+'</td>';
            tbody.innerHTML += '<td>'+data.thing.argumento+'</td>';
            tbody.innerHTML += '</tr>';
        }
    })
    .catch(function(e){
        console.log(e);
    })
}
function borrarTabla(){
    //let url = 'https://web-unicen.herokuapp.com/api/groups/RomaYOli';
    fetch(baseURL + groupID, {
        method: 'DELETE',
        mode: 'cors',
        headers: {'Content-Type':'application/json'}
    }).then(function(r){
        if(!r.ok){
            console.log('FAllaste wey');
        }else{
            return r.json();
        }
    }).catch(function(e){
        console.log(e);
    })
}
function cargarTabla(data){
    fetch(baseURL + groupID + collectionID, {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    }).then(function(r){
        if(!r.ok){
            console.log('FAILLLLLLLLLLLLLLLL')
        }else{
            return r.json()
        }
    })
    mostrarTabla();
}
let h = '5b2945a16146860400d9a663';
fetch(baseURL + groupID + collectionID +'/'+ h,{
    method: 'DELETE',
    mode: 'cors',
    headers: {'Content-Type':'application/json'}
}).then(function(r){
    if(!r.ok){
        console.log('FAILLLLLLLLLLLLLLLL')
    }else{
        return r.json()
    }
})