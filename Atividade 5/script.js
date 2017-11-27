let menu = document.querySelector(".colapsable-menu");
let sandwich = document.querySelector(".sandwich");
let container = document.querySelector(".container");
let overlay = document.querySelector(".overlay");

function toggleActive(){
    menu.classList.toggle("active");
    container.classList.toggle("active");
    overlay.classList.toggle("active");
}

sandwich.addEventListener("click", toggleActive);

overlay.addEventListener("click", toggleActive);

let titles = document.querySelectorAll(".accordeon .item-accordeon .title-accordeon");
let bodies = document.querySelectorAll(".accordeon .item-accordeon .body-accordeon");

for (let i = 0; i < titles.length; i++) {
    titles[i].addEventListener("click", function () {
        if (bodies[i].classList.contains("active")) {
            bodies[i].classList.remove("active");
            bodies[i].style.maxHeight = "0px";

        } else {
            bodies.forEach(function (e) {
                e.classList.remove("active");
                e.style.maxHeight = "0px";
            })
            bodies[i].classList.add("active");
            bodies[i].style.maxHeight = bodies[i].scrollHeight + "px";
        }

    })
}