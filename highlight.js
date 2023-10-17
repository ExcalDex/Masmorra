function highlight(n) {
    debugger;
    switch (n) {
        case 1:
            var texto = document.getElementById("opcoes1");
            texto.style.color = "orange";
            break;
        case 2:
            var texto = document.getElementById("opcoes2");
            texto.style.color = "orange";
            break;
        case 3:
            var texto = document.getElementById("opcoes3");
            texto.style.color = "orange";
            break;
        case 4:
            var texto = document.getElementById("opcoes4")
            texto.style.color = "aqua";
            break;
    }
}
function unhighlight(n) {
    debugger;
    switch (n) {
        case 1:
            var texto = document.getElementById("opcoes1");
            texto.style.color = "red";
            break;
        case 2:
            var texto = document.getElementById("opcoes2");
            texto.style.color = "red";
            break;
        case 3:
            var texto = document.getElementById("opcoes3");
            texto.style.color = "red";
            break;
        case 4:
            var texto = document.getElementById("opcoes4")
            texto.style.color = "rgb(246, 12, 246)";
            break;
    }
}
function resetcontador() {
    localStorage.setItem('score', JSON.stringify(0))
    let scores = JSON.parse(localStorage.getItem('tabelascore'));
    if (scores == undefined) {
        let tabela = {
            nomes: [],
            scores: []
        }
        localStorage.setItem('tabelascore', JSON.stringify(tabela));
    }
}
function mudartexto() {
    let texto = document.querySelector('p');
    let qtd = JSON.parse(localStorage.getItem('score'));
    texto.innerHTML = 'Você passou por ' + qtd + ' andares.';
}
