function maketable() {
    debugger;
    let tabeladados = JSON.parse(localStorage.getItem('tabelascore'));
    if (tabeladados == undefined) {
        let tabela = {
            nomes: [],
            scores: []
        }
        localStorage.setItem('tabelascore', JSON.stringify(tabela));
    }
    let tabela = document.getElementById('tabela');
    let i;
    let k = 0;
    for (i = 1; i < tabeladados.nomes.length+1; i++) {
        let row = tabela.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.innerHTML = tabeladados.nomes[k];
        cell2.innerHTML = tabeladados.scores[k];
        k++;
    }
}