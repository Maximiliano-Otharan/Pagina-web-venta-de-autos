"use strict";
document.querySelector("#MenuRespo").addEventListener('click',ShowMenu);
function ShowMenu(){
    document.querySelector("#Items-Menu").classList.toggle("MenuResponsive");
}
ShowMenu();