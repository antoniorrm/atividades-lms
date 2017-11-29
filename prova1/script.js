



let submit = document.querySelector('input[type="Submit"]');
let title = document.querySelector('input[name="titulo"]');
let nota = document.querySelector('input[name="nota"]');
let palavras = document.querySelectorAll('input[name="subject"]');

submit.addEventListener("click", function (e) {
    e.preventDefault();
    let titu = title.value;
    let not = nota.value;
    let corpo = { title: titu, nota: not };
    for (let i = 0; i < palavras.length; i++) {
        if (palavras[i].checked == true) {
            if (i == 0) {
                corpo.palavra1 = palavras[i].value;
            }
            if (i == 1) {
                corpo.palavra2 = palavras[i].value;
            }
            if (i == 2) {
                corpo.palavra3 = palavras[i].value;
            }
        }
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4) {
            atualizarAccordeon();
        }
    }
    xhttp.open('POST', 'http://rest.learncode.academy/api/antoniorrm/lembretes', true);
    xhttp.setRequestHeader('content-type', 'application/json');
    xhttp.send(JSON.stringify(corpo));
    title.value = "";
    nota.value = "";
});




let corpos = document.querySelectorAll(".accordeon .item-accordeon .corpo-accordeon");
let accordeon = document.querySelector(".accordeon");
function adicionarItem(titulo, nota, palavra) {
    let DItem = document.createElement('div');
    DItem.classList.add("item-accordeon");
    
    let DTitulo= document.createElement('div');
    DTitulo.classList.add("titulo-accordeon");
    let textTitulo = document.createTextNode(titulo);
    DTitulo.appendChild(textTitulo);
    
    let DCorpo = document.createElement('div');
    DCorpo.classList.add("corpo-accordeon");
    let SpanNota = document.createElement('span');
    let SpanPalavra = document.createElement('span');
    let textNota = document.createTextNode(nota);
    let textPalavra = document.createTextNode(palavra);
    SpanNota.appendChild(textNota);
    SpanPalavra.appendChild(textPalavra);
    DCorpo.appendChild(SpanNota);
    DCorpo.appendChild(SpanPalavra);

    DItem.appendChild(DTitulo);
    DItem.appendChild(DCorpo);
    DTitulo.addEventListener("click", function () {
        if (DCorpo.classList.contains("active")) {
            DCorpo.classList.remove("active");
            DCorpo.style.maxHeight = "0px";

        } else {
            corpos.forEach(function (e) {
                e.classList.remove("active");
                e.style.maxHeight = "0px";
            })
            DCorpo.classList.add("active");
            DCorpo.style.maxHeight = DCorpo.scrollHeight + "px";
        }
    })
    accordeon.appendChild(DItem);
}
function atualizarAccordeon(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState==4){
            
            let json = xhttp.responseText;
            let dados_json = JSON.parse(json);

            accordeon.innerHTML = '';
            dados_json.forEach(function(e){
                let palavras ="Palavras-chave: ";
                if(e.palavra1){
                    palavras = palavras + e.palavra1 + " ";
                }
                if(e.palavra2){
                    palavras = palavras + e.palavra2  + " ";
                }
                if(e.palavra3){
                    palavras = palavras + e.palavra3  + " ";
                }
                // console.log(palavras);
                adicionarItem(e.title, e.nota, palavras);
            });
            
        }
    }
    xhttp.open('GET', 'http://rest.learncode.academy/api/antoniorrm/lembretes', true);
    xhttp.send();
}
atualizarAccordeon();
