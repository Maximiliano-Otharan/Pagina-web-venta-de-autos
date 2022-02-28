"use strict";

const urlAutos = `http://localhost/tpe/PaginaWeb/api/autos`;

getAutos(urlAutos);

async function getAutos(url){
    try{
        let res = await fetch(`${url}`);
        console.log(res);
        if(res.status == 200){
            console.log(res);
            let autosDisponibles = await res.json();
            let section = document.getElementById("autos");
                section.innerHTML = " ";
            for (const auto of autosDisponibles){
                let id = auto.Id;
                let modelo = auto.Modelo;
                let pais = auto.Pais_de_origen;
                let motor = auto.Motor;
                let peso = auto.Peso;
                let traccion = auto.Traccion;
                let carroceria = auto.Tipo_de_carroceria;
                let potencia = auto.Potencia;
                let velocidad = auto.Velocidad_maxima;
                let combustible = auto.Combustible
                let precio = auto.Precio;
                    section.innerHTML +=
                `
                <div class="listaAuto">
                <ol>
                    <li>Modelo: ${modelo}</li>
                    <li>Pais de origen: ${pais}</li>
                    <li>Motor: ${motor}</li>
                    <li>Peso: ${peso}</li>
                    <li>Traccion: ${traccion}</li>
                    <li>Carroceria: ${carroceria}</li>
                    <li>Potencia: ${potencia}</li>
                    <li>Velocidad maxima: ${velocidad}</li>
                    <li>Combustible: ${combustible}</li>
                    <li>Precio: ${precio}</li>
                </ol>
                </div>`
                console.log(id);
            }
        }
    }catch(error){
        console.log(error)
    }
}