"uses strict";
let form = document.getElementById("form").addEventListener("submit", noEnviar);

function noEnviar() {
    event.preventDefault();
}

let btn_formulario = document.getElementById("btn-enviar").addEventListener("click",EnviarFormulario);
let valueCaptcha=Math.floor((Math.random()*100)+1);
document.querySelector("#numero").innerHTML=valueCaptcha;
function EnviarFormulario(){
    let Resultado=document.querySelector("#Captcha").value;
    if (Resultado==valueCaptcha){
        document.querySelector("#Resultado-Captcha").innerHTML="Resultado correcto, su consulta fue enviada"
    }else{
        document.querySelector("#Resultado-Captcha").innerHTML="Resultado incorrecto,vuelva a intentarlo";
    }
}


