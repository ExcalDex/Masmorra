const input = document.getElementById('formnome');
input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        salvar();
        event.preventDefault();
    }
});
function salvar() {
    debugger;
    let nome = document.getElementById('formnome').value;
    if (nome == 'admin100407') {
        let tabela = {
            nomes: [],
            scores: []
        }
        localStorage.setItem('tabelascore', JSON.stringify(tabela));
        alert('data clear')
    } else {
        let score = JSON.parse(localStorage.getItem('score'));
        let tabeladados = JSON.parse(localStorage.getItem('tabelascore'));
        let flag = true;
        for (let i = 0; i < tabeladados.nomes.length; i++) {
            if (tabeladados.nomes[i] == nome) {
                if (tabeladados.scores[i] < score) {
                    tabeladados.scores[i] = score;
                }
                flag = false;
            }
        }
        if (flag) {
            tabeladados.nomes[tabeladados.nomes.length] = nome;
            tabeladados.scores[tabeladados.scores.length] = score;
        }
        bubblesort(tabeladados);
        localStorage.setItem('tabelascore', JSON.stringify(tabeladados));
        alert("salvo com sucesso!")
    }
    const form = document.getElementById('formulario');
    form.style.display = 'none';
}
function bubblesort(vetor) {
    for (let i = 0; i < vetor.nomes.length - 1; i++) {
        for (let j = i + 1; j < vetor.nomes.length; j++) {
            if (vetor.scores[i] < vetor.scores[j]) {
                let vaux = vetor.scores[i];
                vetor.scores[i] = vetor.scores[j];
                vetor.scores[j] = vaux;

                vaux = vetor.nomes[i];
                vetor.nomes[i] = vetor.nomes[j];
                vetor.nomes[j] = vaux;
            }
        }
    }
}
