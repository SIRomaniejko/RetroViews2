let nav = document.querySelector(".flex-nav");
document.querySelector(".flex-nav").querySelector(".menu").addEventListener("click", function(){
    nav.classList.toggle("closing");
    nav.classList.toggle("opening");
    nav.classList.toggle("closed");
})

document.querySelector(".flex-top-alt").querySelector(".menu").addEventListener("click", function(){
    nav.classList.toggle("closed");
    nav.classList.toggle("opening");
    nav.classList.remove("closing");
})