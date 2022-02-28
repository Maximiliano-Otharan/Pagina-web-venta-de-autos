"use strict"

let form = document.querySelector("#form");
form.addEventListener("submit", noEnvia);

function noEnvia(e){
    e.preventDefault(e);
    console.log("funciona");
}

const url = `http://localhost/tpe/PaginaWeb/api/autos`;

document.getElementById("agregar").addEventListener("click", function(){

    let Modelo = document.getElementById("modelo").value;
    let Pais_de_origen = document.getElementById("pais").value;
    let Motor = document.getElementById("motor").value;
    let Peso = document.getElementById("peso").value;
    let Traccion = document.getElementById("traccion").value;
    let Tipo_de_carroceria = document.getElementById("carroceria").value;
    let Potencia = document.getElementById("potencia").value;
    let Velocidad_maxima = document.getElementById("velocidad").value;
    let Combustible = document.getElementById("combustible").value;
    let Precio = document.getElementById("precio").value;

    let auto = agrego(Modelo, Pais_de_origen, Motor, Peso, Traccion, Tipo_de_carroceria, Potencia, Velocidad_maxima, Combustible, Precio);
    sendAuto(auto);

});

document.getElementById("modificar").addEventListener("click", function(){

    let Modelo = document.getElementById("modelo").value;
    let Pais_de_origen = document.getElementById("pais").value;
    let Motor = document.getElementById("motor").value;
    let Peso = document.getElementById("peso").value;
    let Traccion = document.getElementById("traccion").value;
    let Tipo_de_carroceria = document.getElementById("carroceria").value;
    let Potencia = document.getElementById("potencia").value;
    let Velocidad_maxima = document.getElementById("velocidad").value;
    let Combustible = document.getElementById("combustible").value;
    let Precio = document.getElementById("precio").value;
    let id = document.getElementById("id").value;

    if(id > 0){
        let auto = agrego(Modelo, Pais_de_origen, Motor, Peso, Traccion, Tipo_de_carroceria, Potencia, Velocidad_maxima, Combustible, Precio, id);
        updateAuto(auto, id);
    }else{
        if(id == 0){
            console.log("No hay autos para modificar");
        }
    }
});

function agrego(Modelo, Pais_de_origen, Motor, Peso, Traccion, Tipo_de_carroceria, Potencia, Velocidad_maxima, Combustible, Precio){
    let autoNuevo = {
        "Modelo": Modelo,
        "Pais_de_origen": Pais_de_origen,
        "Motor": Motor,
        "Peso": Peso,
        "Traccion": Traccion,
        "Tipo_de_carroceria": Tipo_de_carroceria,
        "Potencia": Potencia,
        "Velocidad_maxima": Velocidad_maxima,
        "Combustible": Combustible,
        "Precio": Precio
    }
    console.log(Modelo);
    return autoNuevo;
}

async function sendAuto(autoNuevo){
    try{
        let res = await fetch(`${url}`, {
            "method": "POST",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(autoNuevo)
        });
        console.log(res);
            if(res.status === 201){
                console.log("Se posteo con exito");
                getAutos(url);
            }
        }catch(error){
            console.log(error);
        }
}

async function eliminar(url, id){
    try{
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE"
        });

            if(res.status == 200){
                console.log("Eliminado con exito");
                getAutos(url);
            }
    }catch(error){
        console.log(error);
    }
}

async function updateAuto(modificacion, id){
    try{
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(modificacion)
        });
            if(res.status === 200){
                console.log("Fue modificado con exito");
                getAutos(url);
            }
    }catch(error){
        console.log(error);
    }
}

getAutos(url)

async function getAutos(url){
    try{
        let res = await fetch(`${url}`);
        if(res.status == 200){
            console.log(res);
            let autos = await res.json();
            console.log(autos);
            let section = document.getElementById("autosParaEliminar");
                section.innerHTML = " ";
            for (const auto of autos){
                let id = auto.Id;
                let modelo = auto.Modelo;
                    section.innerHTML +=
                `
                <ul>
                    <li>Id: ${id} / Modelo: ${modelo} / <button id="eliminar${id}">Eliminar</button></li>
                </ul>
                `
                console.log(id);
                setTimeout(function(){
                    document.getElementById(`eliminar${id}`).addEventListener("click", function(){
                        eliminar(url, id);
                    });
                }, 1);
            }
        }
    }catch(error){
        console.log(error);
    }
}