
let submit = document.querySelector('input[type="Submit"]');
let title = document.querySelector('input[name="titulo"]');
let descricao = document.querySelector('input[name="descricao"]');
let bairro = document.querySelectorAll('input[name="subject"]');

submit.addEventListener("click", function (e) {
    e.preventDefault();
    let titu = title.value;
    let desc = descricao.value;
    let anuncio = { title: titu, descricao: desc};
    for (let i = 0; i < bairro.length; i++) {
        if (bairro[i].checked == true) {
            anuncio.bairro = bairro[i].value;
        }
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
           atualizarSlide();
        }
    }
    xhttp.open('POST', 'http://rest.learncode.academy/api/antoniorrm/anuncios', true);
    xhttp.setRequestHeader('content-type', 'application/json');
    xhttp.send(JSON.stringify(anuncio));
    title.value = "";
    descricao.value = "";
    for (let i = 0; i < bairro.length; i++) {
        if (bairro[i].checked == true) {
            bairro[i].checked = false;
        }
    }
});

let slides = document.querySelector(".slider");

function adicionarItem(titulo, descricao, bairro) {
    let DItem = document.createElement('div');
    DItem.classList.add("item");

    let DTitulo = document.createElement('div');
    DTitulo.classList.add("titulo");
    let textTitulo = document.createTextNode(titulo);
    DTitulo.appendChild(textTitulo);

    let DConteudo = document.createElement('div');
    DConteudo.classList.add("conteudo");

    let SpanDescricao = document.createElement('span');
    let SpanBairro = document.createElement('span');
    let textDecricao = document.createTextNode(descricao);
    let textBairro = document.createTextNode("Bairro: " + bairro);

    SpanDescricao.appendChild(textDecricao);
    SpanBairro.appendChild(textBairro);
    DConteudo.appendChild(SpanDescricao);
    DConteudo.appendChild(SpanBairro);

    DItem.appendChild(DTitulo);
    DItem.appendChild(DConteudo);
    
    slides.appendChild(DItem);
    
}
function atualizarSlide() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {

            let json = xhttp.responseText;
            let dados_json = JSON.parse(json);
            slides.innerHTML = ' <div class="arrow left"> &lt; </div> <div class="arrow right"> &gt; </div>';

            dados_json.forEach(function (e) {
                adicionarItem(e.title, e.descricao, e.bairro);
            });
            let item = document.querySelectorAll(".slider .item");
            item[0].classList.add("active");
            let botaoLeft = document.querySelector(".arrow.left");
            let botaoRight = document.querySelector(".arrow.right");
            let current = 0;
            function nextSlide() {
                item[current].classList.remove("active");
                current++;
                if (current > item.length - 1) {
                    current = 0;
                }
                item[current].classList.add("active");
            }
            
            function previousSlide() {
                item[current].classList.remove("active");
                current--;
                if (current < 0) {
                    current = item.length - 1;
                }
                item[current].classList.add("active");
            }
            
            botaoRight.addEventListener("click", nextSlide);
            botaoLeft.addEventListener("click", previousSlide);
                        
        }
    }
    xhttp.open('GET', 'http://rest.learncode.academy/api/antoniorrm/anuncios', true);
    xhttp.send();
}
atualizarSlide();


