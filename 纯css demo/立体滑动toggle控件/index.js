var oToggle = document.getElementsByClassName("toggle")[0];

window.addEventListener("DOMContentLoaded",init);

function init(){
    oToggle.addEventListener("click",function(){
        var oIneer = document.getElementsByClassName("inner")[0];
        oIneer.classList.toggle("active");
    });
}