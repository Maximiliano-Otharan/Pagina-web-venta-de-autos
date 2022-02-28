"use strict"

let form = document.querySelector("#form");
form.addEventListener("submit", noEnvia);

function noEnvia(e){
    e.preventDefault(e);
    console.log("funciona");
}

const urlAutos = `http://localhost/pagina/api/autos`;
const urlCarrito = `http://localhost/pagina/api/carrito`;
const result = document.getElementById("total");

getAutos(urlAutos);
getCarrito(urlCarrito);

async function getAutos(url){
    try{
        let res = await fetch(`${url}`);
        console.log(res);
        if(res.status == 200){
            console.log(res);
            let tablaAutosDisponibles = await res.json();
            let section = document.getElementById("tablaAutosDisponibles");
                section.innerHTML = " ";

            for (const auto of tablaAutosDisponibles){
                let id = auto.Id;
                let modelo = auto.Modelo;
                let pais = auto.Pais_de_origen;
                let precio = auto.Precio;
                    section.innerHTML +=
                `
                <table>
                    <thead>
                        <th>Modelo</th>
                        <th>Pais</th>
                        <th>Precio</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${modelo}</td>
                            <td>${pais}</td>
                            <td>${precio}</td>
                            <td><button id="AgregarAlCarrito${id}">Agregar al carrito</button></td>
                        </tr>
                    </tbody>
                </table>
                `
                console.log(id);

                setTimeout(function(){
                    document.getElementById(`AgregarAlCarrito${id}`).addEventListener("click", function(){
                        agregar(id, modelo, pais, precio);
                    });
                }, 1)
            }
        }
    }catch(error){
        console.log(error)
    }
}

function agregar(id, modelo, pais, precio){
    let auto = {
        "Modelo": modelo,
        "Pais_de_origen": pais,
        "Precio": precio,
        "Id_auto_fk": id
    }
    console.log(auto);

    sendAuto(auto);
}

async function sendAuto(auto){
    try{
        let res = await fetch(`${urlCarrito}`, {
            "method": "POST",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(auto)
        });
        console.log(res);
            if(res.status === 201){
                console.log("Se posteo con exito");
                getCarrito(urlCarrito);
            }
        }catch(error){
            console.log(error);
        }
}

async function getCarrito(url){
    try{
        let res = await fetch(`${url}`);
        result.innerHTML = 0;
        if(res.status == 200){
            console.log(res);
            let tablaCarrito = await res.json();
            console.log(tablaCarrito);
            let section = document.getElementById("tablaCarritoDeCompras");
            let total = 0;
                section.innerHTML = " ";
            for (const auto of tablaCarrito){
                let id = auto.Id;
                let modelo = auto.Modelo;
                let pais = auto.Pais_de_origen;
                let precio = auto.Precio;
                let idAuto = auto.Id_auto_fk;
                    section.innerHTML +=
                `
                <table>
                    <thead>
                        <th>Modelo</th>
                        <th>Pais</th>
                        <th>Precio</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${modelo}</td>
                            <td>${pais}</td>
                            <td>${precio}</td>
                            <td><button id="EliminarDelCarrito${id}">Eliminar del carrito</button></td>
                        </tr>
                    </tbody>
                </table>
                `
                console.log(id);
                total = (total + Number(precio));
                result.innerHTML = total;
                console.log(total);
                setTimeout(function(){
                    document.getElementById(`EliminarDelCarrito${id}`).addEventListener("click", function(){
                        eliminar(url, id);
                    });
                }, 1);
            }
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
                getCarrito(url);
            }
    }catch(error){
        console.log(error);
    }
}