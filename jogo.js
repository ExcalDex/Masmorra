function Labirinto() {
    this.espacos = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ];
    this.caminhos = [];
    this.final = [];
    this.possivel = function (y, x) {
        var possibilidades = '';
        if (y != 0 && this.espacos[y - 1][x] == '') {
            possibilidades = possibilidades + 'S';
        }
        if (y != 5 && this.espacos[y + 1][x] == '') {
            possibilidades = possibilidades + 'A';
        }
        if (x != 0 && this.espacos[y][x - 1] == '') {
            possibilidades = possibilidades + 'E';
        }
        if (x != 5 && this.espacos[y][x + 1] == '') {
            possibilidades = possibilidades + 'D';
        }
        return possibilidades;
    };
    this.tipo = function (tipo) {

        var possibilidades = [];
        if (tipo == 'SAED') {
            possibilidades[0] = 'S';//sobe
            possibilidades[1] = 'SA';//sobe abaixa
            possibilidades[2] = 'SE';//sobe esquerda
            possibilidades[3] = 'SD';//sobe direita
            possibilidades[4] = 'SAD';//sobe abaixa direita
            possibilidades[5] = 'SED';//sobe esquerda direita
            possibilidades[6] = 'SAE';//sobe abaixa esquerda
            possibilidades[7] = 'A';//abaixa
            possibilidades[8] = 'AE';//abaixa esquerda
            possibilidades[9] = 'AD';//abaixa direita
            possibilidades[10] = 'AED';//abaixa esquerda direita
            possibilidades[11] = 'E';//esquerda
            possibilidades[12] = 'ED';//esquerda direita
            possibilidades[13] = 'D';//direita
            possibilidades[14] = 'SAED';//todos
        } else {
            var i = 0;
            if (tipo.includes('S')) {
                if (tipo.includes('A')) {
                    if (tipo.includes('E')) {
                        possibilidades[i] = 'SAE';//sobe abaixa esquerda
                        i++;
                    }
                    if (tipo.includes('D')) {
                        possibilidades[i] = 'SAD';//sobe abaixa direita
                        i++;
                    }
                    possibilidades[i] = 'SA';//sobe abaixa
                    i++;
                }
                if (tipo.includes('E')) {
                    if (tipo.includes('D')) {
                        possibilidades[i] = 'SED';//sobe esquerda direita
                        i++;
                    }
                    possibilidades[i] = 'SE';//sobe esquerda
                    i++;
                }
                if (tipo.includes('D')) {
                    possibilidades[i] = 'SD';//sobe direita 
                    i++;
                }
                possibilidades[i] = 'S';//sobe
                i++;
            }
            if (tipo.includes('A')) {
                if (tipo.includes('E')) {
                    if (tipo.includes('D')) {
                        possibilidades[i] = 'AED';//abaixa esquerda direita
                        i++;
                    }
                    possibilidades[i] = 'AE';//abaixa esquerda
                    i++;
                }
                if (tipo.includes('D')) {
                    possibilidades[i] = 'AD';//abaixa direita
                    i++;
                }
                possibilidades[i] = 'A';//abaixa
                i++;
            }
            if (tipo.includes('E')) {
                if (tipo.includes('D')) {
                    possibilidades[i] = 'ED';//esquerda direita
                    i++;
                }
                possibilidades[i] = 'E';//esquerda
                i++;
            }
            if (tipo.includes('D')) {
                possibilidades[i] = 'D';//direita
            }
        }
        return possibilidades[Math.floor(Math.random() * possibilidades.length)];
    }
    this.escolhalado = function (y, x) {

        var possibilidades = [
            [-y - 1, -x - 1],
            ['N', 'N'],
            ['N', 'N'],
            ['N', 'N']
        ];
        var i = 0;
        if (this.espacos[y][x].includes('D') && this.espacos[y][x + 1] == '') {
            possibilidades[i][0] = 0;
            possibilidades[i][1] = 1;
            i++;
        }
        if (this.espacos[y][x].includes('E') && this.espacos[y][x - 1] == '') {
            possibilidades[i][0] = 0;
            possibilidades[i][1] = -1;
            i++;
        }
        if (this.espacos[y][x].includes('S') && this.espacos[y - 1][x] == '') {
            possibilidades[i][0] = -1;
            possibilidades[i][1] = 0;
            i++;
        }
        if (this.espacos[y][x].includes('A') && this.espacos[y + 1][x] == '') {
            possibilidades[i][0] = 1;
            possibilidades[i][1] = 0;
            i++;
        }
        var j = Math.floor(Math.random() * i);
        return [x + possibilidades[j][1], y + possibilidades[j][0]];
    }
    this.pathfind = function (oy, ox, dey, dex, paray, parax) {
        var distanciay = 0;
        var distanciax = 0;
        var movex0 = false;//-
        var movey0 = false;//-
        var movex1 = false;//+
        var movey1 = false;//+
        var inx = ox;
        var iny = oy;
        var orientacao = 4;
        if (dey < paray) distanciay = 1;
        if (dey > paray) distanciay = -1;
        if (dex < parax) distanciax = 1;
        if (dex > parax) distanciax = -1;
        if (distanciax < 0 && dex > 0 && this.espacos[dey][dex - 1] == '') movex0 = true;
        if (distanciax > 0 && dex < 5 && this.espacos[dey][dex + 1] == '') movex1 = true;
        if (distanciay < 0 && dey > 0 && this.espacos[dey - 1][dex] == '') movey0 = true;
        if (distanciay > 0 && dey < 5 && this.espacos[dey + 1][dex] == '') movey1 = true;
        if (movey0 && movex0) orientacao = Math.floor(Math.random() * 2) + 2;
        else {
            if (movey1 && movex1) orientacao = Math.floor(Math.random() * 2);
            else {
                if (movey0 && movex1) orientacao = Math.floor(Math.random() * 2) + 1;
                else {
                    if (movey1 && movex0) {
                        orientacao = Math.floor(Math.random() * 2)
                        if (orientacao == 1) orientacao = 3;
                    } else {
                        if (movey1) orientacao = 0;
                        if (movex1) orientacao = 1;
                        if (movey0) orientacao = 2;
                        if (movex0) orientacao = 3;
                    }
                }
            }
        }
        var flag = true;
        var primeiravez = true;
        while (flag) {
            if (dex == inx + 1 && dey == iny && this.espacos[iny][inx].includes('D')) this.espacos[dey][dex] = this.espacos[dey][dex] + 'E';
            if (dex == inx - 1 && dey == iny && this.espacos[iny][inx].includes('E')) this.espacos[dey][dex] = this.espacos[dey][dex] + 'D';
            if (dey == iny + 1 && dex == inx && this.espacos[iny][inx].includes('A')) this.espacos[dey][dex] = this.espacos[dey][dex] + 'S';
            if (dey == iny - 1 && dex == inx && this.espacos[iny][inx].includes('S')) this.espacos[dey][dex] = this.espacos[dey][dex] + 'A';
            if (dex == ox - 1 && (ox != inx || oy != iny)) this.espacos[dey][dex] = this.espacos[dey][dex] + 'D';
            if (dex == ox + 1 && (ox != inx || oy != iny)) this.espacos[dey][dex] = this.espacos[dey][dex] + 'E';
            if (dey == oy + 1 && (ox != inx || oy != iny)) this.espacos[dey][dex] = this.espacos[dey][dex] + 'S';
            if (dey == oy - 1 && (ox != inx || oy != iny)) this.espacos[dey][dex] = this.espacos[dey][dex] + 'A';
            if (primeiravez) {
                if (orientacao == 0) {
                    oy = dey;
                    ox = dex;
                    dey++;
                    if (dey == 3 || dey == paray) distanciay = 0;
                    this.espacos[oy][ox] = this.espacos[oy][ox] + 'A';
                    this.caminhos.push([oy, ox]);
                }
                if (orientacao == 1) {
                    oy = dey;
                    ox = dex;
                    dex++;
                    if (dex == 3 || dex == parax) distanciax = 0;
                    this.espacos[oy][ox] = this.espacos[oy][ox] + 'D';
                    this.caminhos.push([oy, ox]);
                }
                if (orientacao == 2) {
                    oy = dey;
                    ox = dex;
                    dey--;
                    if (dey == 0 || dey == paray) distanciay = 0;
                    this.espacos[oy][ox] = 'S' + this.espacos[oy][ox];
                    this.caminhos.push([oy, ox]);
                }
                if (orientacao == 3) {
                    oy = dey;
                    ox = dex;
                    dex--;
                    if (dex == 0 || dex == parax) distanciax = 0;
                    this.espacos[oy][ox] = 'E' + this.espacos[oy][ox];
                    this.caminhos.push([oy, ox]);
                }
                if (orientacao == 4) {
                    this.final.push([dey, dex]);
                    flag = false;
                }
                primeiravez = false;
            } else {
                if ((dey == paray && dex == parax) || (this.espacos[dey + distanciay][dex] != '' && this.espacos[dey][dex + distanciax] != '')) {
                    this.final.push([dey, dex]);
                    flag = false;
                } else {
                    if ((dey != paray && this.espacos[dey + distanciay][dex] == '') && (dex != parax && this.espacos[dey][dex + distanciax] == '')) {
                        var mudanca = Math.floor(Math.random() * 2);
                    } else {
                        if (dey != paray && this.espacos[dey + distanciay][dex] == '') {
                            var mudanca = 0;
                        }
                        if (dex != parax && this.espacos[dey][dex + distanciax] == '') {
                            var mudanca = 1;
                        }
                    }
                    if (mudanca == 0) {
                        if (distanciay < 0) {
                            oy = dey;
                            ox = dex;
                            dey--;
                            if (dey == 0 || dey == paray) distanciay = 0;
                            this.espacos[oy][ox] = 'S' + this.espacos[oy][ox];
                            this.caminhos.push([oy, ox]);
                        } else {
                            oy = dey;
                            ox = dex;
                            dey++;
                            if ((dey == 5 && distanciay > 0) || dey == paray) distanciay = 0;
                            this.espacos[oy][ox] = this.espacos[oy][ox] + 'A';
                            this.caminhos.push([oy, ox]);
                        }
                    }
                    if (mudanca == 1) {
                        if (distanciax < 0) {
                            oy = dey;
                            ox = dex;
                            dex--;
                            if (dex == 0 || dex == parax) distanciax = 0;
                            this.espacos[oy][ox] = 'E' + this.espacos[oy][ox];
                            this.caminhos.push([oy, ox]);
                        } else {
                            oy = dey;
                            ox = dex;
                            dex++;
                            if ((dex == 5 && distanciax > 0) || dex == parax) distanciax = 0;
                            this.espacos[oy][ox] = this.espacos[oy][ox] + 'D';
                            this.caminhos.push([oy, ox]);
                        }
                    }
                }
            }
        }
    }
    this.gerarconexao = function (y, x) {
        let conexaox;
        let conexaoy;
        let antiloop = 0;
        do {
            conexaox = Math.floor(Math.random() * 6);
            conexaoy = Math.floor(Math.random() * 6);
            antiloop++;
        } while ((this.espacos[conexaoy][conexaox] != '' || (conexaox == x || conexaoy == y)) && antiloop < 200);
        if (antiloop < 200) return [conexaoy, conexaox];
        else return -1;
    }
    this.selecionarfinal = function () {
        return [this.final[this.final.length - 1][0], this.final[this.final.length - 1][1]];
    }
    this.identificartipo = function (y, x) {
        let nome = this.espacos[y][x];
        if (nome.includes('S') && nome.includes('A') && nome.includes('D') && nome.includes('E')) {
            return 'SAED'
        } else {
            if (nome.includes('S')) {
                if (nome.includes('A') && nome.includes('D')) return 'SAD';
                else {
                    if (nome.includes('A') && nome.includes('E')) return 'SAE';
                    else {
                        if (nome.includes('E') && nome.includes('D')) return 'SED';
                        else {
                            if (nome.includes('A')) return 'SA';
                            else {
                                if (nome.includes('E')) return 'SE';
                                else {
                                    if (nome.includes('D')) return 'SD';
                                    else {
                                        return 'S';
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (nome.includes('A')) {
                    if (nome.includes('D') && nome.includes('E')) return 'AED';
                    else {
                        if (nome.includes('D')) return 'AD';
                        else {
                            if (nome.includes('E')) return 'AE';
                            else {
                                return 'A'
                            }
                        }
                    }
                } else {
                    if (nome.includes('E')) {
                        if (nome.includes('D')) return 'ED';
                        else {
                            return 'E';
                        }
                    } else {
                        if (nome.includes('D')) return 'D';
                        else {
                            return '';
                        }
                    }
                }
            }
        }
    }
}
function setup() {//Essa function vai criar o mapa base  de maneira randomica)
    let qtd = JSON.parse(localStorage.getItem('score'));
    qtd++;
    let texto = document.querySelector('p');
    texto.innerHTML = 'Fase :' + qtd;
    localStorage.setItem('score', JSON.stringify(qtd));
    var finaldef;
    var masmorra = new Labirinto();
    var iniciox = Math.floor(Math.random() * 6);//Escolhe onde será a posição do inicio no eixo x
    var inicioy = Math.floor(Math.random() * 6);//Escolhe onde será a posição do inicio no eixo y
    let conex = [];
    conex[0] = Math.floor(Math.random() * 6);
    conex[1] = Math.floor(Math.random() * 6);
    while (conex[0] == inicioy || conex[0] == inicioy - 1 || conex[0] == inicioy + 1) {
        conex[0] = Math.floor(Math.random() * 6);
    }
    while (conex[1] == iniciox || conex[1] == iniciox + 1 || conex[1] == iniciox - 1) {
        conex[1] = Math.floor(Math.random() * 6);
    }
    var caminhospos = masmorra.possivel(inicioy, iniciox);//Checa os tipos possíveis do caminho no ponto do inicio
    masmorra.espacos[inicioy][iniciox] = masmorra.espacos[inicioy][iniciox] + masmorra.tipo(caminhospos);//Cria o tipo do caminho no ponto inicial
    var lados = masmorra.escolhalado(inicioy, iniciox);//Escolhe um dos lados do caminho no ponto inicial
    masmorra.pathfind(inicioy, iniciox, lados[1], lados[0], conex[0], conex[1]);//Liga os dois pontos desejados
    let antiloop = 0;
    var posinicio = true;//Variavel que funcionará como flag para avisar que todas as direções do caminho inicial tem conexões que se fecham. 
    let nivel = JSON.parse(localStorage.getItem('score'));
    let afluentes;
    if(nivel <= 5)
        afluentes = 3;
    else{
        if(nivel <= 10)
            afluentes = 4;
        else{
            if(nivel <= 15)
                afluentes = 5;
            else{
                if(nivel <= 20)
                    afluentes =6;
                else{
                    afluentes = 20;
                }
            }
        }
    }
    for (let i = 0; i < afluentes; i++) {
        if (!posinicio) {//Todos os caminhos do inicio devem ter conexões.
            let j = Math.floor(Math.random() * masmorra.caminhos.length);//Pega um caminho qualquer que seja diferente do inicio e do fim para gerar caminhos adjascentes dele.
            let ponto = masmorra.caminhos[j];
            let y = ponto[0]
            let x = ponto[1]
            let conexao = masmorra.gerarconexao(y, x);
            if (conexao == -1) {
                i = afluentes;
            } else {
                if (y < 3 && (conexao[0] > y && masmorra.espacos[y + 1][x] != '') && x < 3 && (conexao[1] > x && masmorra.espacos[y][x + 1] != '')) i--;
                else {
                    if (y < 3 && (conexao[0] > y && masmorra.espacos[y + 1][x] != '') && x > 0 && (conexao[1] < x && masmorra.espacos[y][x - 1] != '')) i--;
                    else {
                        if (y > 0 && (conexao[0] < y && masmorra.espacos[y - 1][x] != '') && x < 3 && (conexao[1] > x && masmorra.espacos[y][x + 1] != '')) i--;
                        else {
                            if (y > 0 && (conexao[0] < y && masmorra.espacos[y - 1][x] != '') && x > 0 && (conexao[1] < x && masmorra.espacos[y][x - 1] != '')) i--;
                            else {
                                let testes = [];
                                let contador = 0;
                                if (y > 0 && masmorra.espacos[y - 1][x] == '') {
                                    testes[contador] = 'S';
                                    contador++;
                                }
                                if (y < 3 && masmorra.espacos[y + 1][x] == '') {
                                    testes[contador] = 'A';
                                    contador++;
                                }
                                if (x > 0 && masmorra.espacos[y][x - 1] == '') {
                                    testes[contador] = 'E';
                                    contador++;
                                }
                                if (x < 3 && masmorra.espacos[y][x + 1] == '') {
                                    testes[contador] = 'D';
                                    contador++;
                                }
                                if (testes.length > 0) {
                                    masmorra.espacos[y][x] = masmorra.espacos[y][x] + testes[Math.floor(Math.random() * contador)];
                                }
                                let ladosconex = masmorra.escolhalado(y, x);
                                if (ladosconex[0] != -1 && ladosconex[1] != -1) {
                                    masmorra.pathfind(y, x, ladosconex[1], ladosconex[0], conexao[0], conexao[1])
                                } else {
                                    i--;
                                    antiloop++;
                                    if (antiloop == 100) {
                                        i = afluentes;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            //Linhas 361-372 checam se existe alguma conexão possível no caminho da posição incial. Se não houver o algoritmo vai começar a criar caminhos secundários em outros lugares (linhas 324 até 358 ) 
            let bandeira = true;
            while (bandeira) {
                let ladosconex = masmorra.escolhalado(inicioy, iniciox);
                if (ladosconex[0] == -1 && ladosconex[1] == -1) {
                    bandeira = false;
                    posinicio = false;
                } else {
                    let conexao = masmorra.gerarconexao(ladosconex[1], ladosconex[0]);
                    masmorra.pathfind(inicioy, iniciox, ladosconex[1], ladosconex[0], conexao[0], conexao[1]);
                }
                i++;
            }
        }
    }
    finaldef = masmorra.selecionarfinal();
    printout(masmorra, iniciox, inicioy, finaldef[1], finaldef[0]);
    enemysetup(masmorra, inicioy, iniciox);
    piscar(masmorra);
}


function printout(labirinto, ix, iy, fx, fy) {
    let k = 0;
    let areas = document.querySelectorAll('.area');
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (i != iy || j != ix) {
                if (i != fy || j != fx) {
                    let nome = labirinto.identificartipo(i, j);
                    areas[k].innerHTML = '<img src="fundopreto' + nome + '.png" alt="locais" width=100% height=100%>';
                } else {
                    let nome = labirinto.identificartipo(i, j);;
                    areas[k].innerHTML = '<img src="fundopreto' + nome + 'y.png" alt="locais" width=100% height=100%>';
                }
            } else {
                let nome = labirinto.identificartipo(i, j);;
                areas[k].innerHTML = '<img src="' + nome + 'z.png" alt="locais" width=100% height=100%>';
                var coordenada1d = k;
            }
            k++;
        }
    }
    retirareventol(coordenada1d);
}
function highlighter(coordenada1d) {
    let labirinto = new Labirinto();
    labirinto.espacos = identificador();
    let origem = localizador();
    let origem1d = origem[0] * 6 + origem[1]
    let areas = document.querySelectorAll('.area');
    let coordenaday = Math.floor(coordenada1d / 6);
    let coordenadax = coordenada1d % 6;
    if (labirinto.espacos[coordenaday][coordenadax] != '') {
        let flag = false;
        if (coordenaday == origem[0] && coordenadax == origem[1] + 1 && areas[origem1d].innerHTML.includes('D')) {
            flag = true;
        }
        if (coordenaday == origem[0] && coordenadax == origem[1] - 1 && areas[origem1d].innerHTML.includes('E')) {
            flag = true;
        }
        if (coordenaday == origem[0] + 1 && coordenadax == origem[1] && areas[origem1d].innerHTML.includes('A')) {
            flag = true;
        }
        if (coordenaday == origem[0] - 1 && coordenadax == origem[1] && areas[origem1d].innerHTML.includes('S')) {
            flag = true;
        }
        if (flag) {
            if (!areas[coordenada1d].innerHTML.includes('x')) {
                if (!areas[coordenada1d].innerHTML.includes('y')) {
                    let nome = labirinto.espacos[coordenaday][coordenadax];
                    areas[coordenada1d].innerHTML = '<img src="' + nome + '.png" alt="locais" width=100% height=100%>';
                } else {
                    let nome = labirinto.espacos[coordenaday][coordenadax];
                    areas[coordenada1d].innerHTML = '<img src="' + nome + 'y.png" alt="locais" width=100% height=100%>';
                }
            } else {
                if (!areas[coordenada1d].innerHTML.includes('y')) {
                    let nome = labirinto.espacos[coordenaday][coordenadax];
                    areas[coordenada1d].innerHTML = '<img src="' + nome + 'x.png" alt="locais" width=100% height=100%>';
                } else {
                    let nome = labirinto.espacos[coordenaday][coordenadax];
                    areas[coordenada1d].innerHTML = '<img src="' + nome + 'yx.png" alt="locais" width=100% height=100%>';
                }
            }
            retirareventoe(coordenada1d);
        }
    }
    retirareventoe(coordenada1d);
}
function unhighlighter(coordenada1d) {
    let labirinto = identificador();
    let areas = document.querySelectorAll('.area');
    let coordenaday = Math.floor(coordenada1d / 6);
    let coordenadax = coordenada1d % 6;
    if (!areas[coordenada1d].innerHTML.includes('x')) {
        if (!areas[coordenada1d].innerHTML.includes('y')) {
            areas[coordenada1d].innerHTML = '<img src="fundopreto' + labirinto[coordenaday][coordenadax] + '.png" alt="locais" width=100% height=100%>';
            criareventoe(coordenada1d);
        } else {
            areas[coordenada1d].innerHTML = '<img src="fundopreto' + labirinto[coordenaday][coordenadax] + 'y.png" alt="locais" width=100% height=100%>';
            criareventoe(coordenada1d);
        }
    } else {
        if (!areas[coordenada1d].innerHTML.includes('y')) {
            areas[coordenada1d].innerHTML = '<img src="fundopreto' + labirinto[coordenaday][coordenadax] + 'x.png" alt="locais" width=100% height=100%>';
            criareventoe(coordenada1d);
        } else {
            areas[coordenada1d].innerHTML = '<img src="fundopreto' + labirinto[coordenaday][coordenadax] + 'yx.png" alt="locais" width=100% height=100%>';
            criareventoe(coordenada1d);
        }
    }
}
function identificador() {
    let mapa = [];
    let areas = document.querySelectorAll('.area');
    let arrayaux = [];
    let j = 0;
    for (let i = 0; i < 36; i++) {
        let nome = areas[i].innerHTML;
        if (nome.includes('S') && nome.includes('A') && nome.includes('D') && nome.includes('E')) {
            arrayaux[j] = 'SAED';
        } else {
            if (nome.includes('S')) {
                if (nome.includes('A') && nome.includes('D')) arrayaux[j] = 'SAD';
                else {
                    if (nome.includes('A') && nome.includes('E')) arrayaux[j] = 'SAE';
                    else {
                        if (nome.includes('E') && nome.includes('D')) arrayaux[j] = 'SED';
                        else {
                            if (nome.includes('A')) arrayaux[j] = 'SA';
                            else {
                                if (nome.includes('E')) arrayaux[j] = 'SE';
                                else {
                                    if (nome.includes('D')) arrayaux[j] = 'SD';
                                    else {
                                        arrayaux[j] = 'S';
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (nome.includes('A')) {
                    if (nome.includes('D') && nome.includes('E')) arrayaux[j] = 'AED';
                    else {
                        if (nome.includes('D')) arrayaux[j] = 'AD';
                        else {
                            if (nome.includes('E')) arrayaux[j] = 'AE';
                            else {
                                arrayaux[j] = 'A'
                            }
                        }
                    }
                } else {
                    if (nome.includes('E')) {
                        if (nome.includes('D')) arrayaux[j] = 'ED';
                        else {
                            arrayaux[j] = 'E';
                        }
                    } else {
                        if (nome.includes('D')) arrayaux[j] = 'D';
                        else {
                            arrayaux[j] = '';
                        }
                    }
                }
            }
        }
        j++;
        if (arrayaux.length == 6) {
            mapa.push([arrayaux[0], arrayaux[1], arrayaux[2], arrayaux[3], arrayaux[4], arrayaux[5]]);
            arrayaux = [];
            j = 0;
        }
    }
    return mapa;
}
function localizador() {
    let areas = document.querySelectorAll('.area');
    for (let i = 0; i < 36; i++) {
        if (!areas[i].innerHTML.includes('fundopreto') && areas[i].innerHTML.includes('z')) {
            let aaux = [2];
            aaux[1] = i % 6;
            aaux[0] = Math.floor(i / 6);
            return aaux;
        }
    }
}
function move(coordenada1d) {
    let coordenadax = coordenada1d % 6;
    let coordenaday = Math.floor(coordenada1d / 6);
    let origem = localizador();
    let origem1d = origem[0] * 6 + origem[1];
    let areas = document.querySelectorAll('.area')
    let flag = false;
    if (coordenaday == origem[0] && coordenadax == origem[1] + 1 && areas[origem1d].innerHTML.includes('D')) {
        flag = true;
    }
    if (coordenaday == origem[0] && coordenadax == origem[1] - 1 && areas[origem1d].innerHTML.includes('E')) {
        flag = true;
    }
    if (coordenaday == origem[0] + 1 && coordenadax == origem[1] && areas[origem1d].innerHTML.includes('A')) {
        flag = true;
    }
    if (coordenaday == origem[0] - 1 && coordenadax == origem[1] && areas[origem1d].innerHTML.includes('S')) {
        flag = true;
    }
    if (flag) {
        let inimigo = localizar();
        if (coordenada1d != inimigo) {
            let labirinto = new Labirinto();
            flag = false;
            labirinto.espacos = identificador();
            let nome = labirinto.espacos[coordenaday][coordenadax];
            if (areas[coordenada1d].innerHTML.includes('y')) {
                flag = true;
            }
            areas[coordenada1d].innerHTML = '<img src="' + nome + 'z.png" alt="locais" width=100% height=100%>';
            retirareventol(coordenada1d);
            nome = labirinto.espacos[origem[0]][origem[1]];
            areas[origem1d].innerHTML = '<img src="' + nome + '.png" alt="locais" width=100% height=100%>'
            retirareventol(origem1d);
            if (flag) {
                location.reload();
            }
        } else {
            window.location.href = 'gameover.html';
        }
    }
}
function retirareventol(coordenada1d) {
    let area = document.getElementById('a' + coordenada1d);
    if (coordenada1d == 0) {
        area.removeEventListener('mouseleave', a0u);
    }
    if (coordenada1d == 1) {
        area.removeEventListener('mouseleave', a1u);
    }
    if (coordenada1d == 2) {
        area.removeEventListener('mouseleave', a2u);
    }
    if (coordenada1d == 3) {
        area.removeEventListener('mouseleave', a3u);
    }
    if (coordenada1d == 4) {
        area.removeEventListener('mouseleave', a4u);
    }
    if (coordenada1d == 5) {
        area.removeEventListener('mouseleave', a5u);
    }
    if (coordenada1d == 6) {
        area.removeEventListener('mouseleave', a6u);
    }
    if (coordenada1d == 7) {
        area.removeEventListener('mouseleave', a7u);
    }
    if (coordenada1d == 8) {
        area.removeEventListener('mouseleave', a8u);
    }
    if (coordenada1d == 9) {
        area.removeEventListener('mouseleave', a9u);
    }
    if (coordenada1d == 10) {
        area.removeEventListener('mouseleave', a10u);
    }
    if (coordenada1d == 11) {
        area.removeEventListener('mouseleave', a11u);
    }
    if (coordenada1d == 12) {
        area.removeEventListener('mouseleave', a12u);
    }
    if (coordenada1d == 13) {
        area.removeEventListener('mouseleave', a13u);
    }
    if (coordenada1d == 14) {
        area.removeEventListener('mouseleave', a14u);
    }
    if (coordenada1d == 15) {
        area.removeEventListener('mouseleave', a15u);
    }
    if (coordenada1d == 16) {
        area.removeEventListener('mouseleave', a16u);
    }
    if (coordenada1d == 17) {
        area.removeEventListener('mouseleave', a17u);
    }
    if (coordenada1d == 18) {
        area.removeEventListener('mouseleave', a18u);
    }
    if (coordenada1d == 19) {
        area.removeEventListener('mouseleave', a19u);
    }
    if (coordenada1d == 20) {
        area.removeEventListener('mouseleave', a20u);
    }
    if (coordenada1d == 21) {
        area.removeEventListener('mouseleave', a21u);
    }
    if (coordenada1d == 22) {
        area.removeEventListener('mouseleave', a22u);
    }
    if (coordenada1d == 23) {
        area.removeEventListener('mouseleave', a23u);
    }
    if (coordenada1d == 24) {
        area.removeEventListener('mouseleave', a24u);
    }
    if (coordenada1d == 25) {
        area.removeEventListener('mouseleave', a25u);
    }
    if (coordenada1d == 26) {
        area.removeEventListener('mouseleave', a26u);
    }
    if (coordenada1d == 27) {
        area.removeEventListener('mouseleave', a27u);
    }
    if (coordenada1d == 28) {
        area.removeEventListener('mouseleave', a28u);
    }
    if (coordenada1d == 29) {
        area.removeEventListener('mouseleave', a29u);
    }
    if (coordenada1d == 30) {
        area.removeEventListener('mouseleave', a30u);
    }
    if (coordenada1d == 31) {
        area.removeEventListener('mouseleave', a31u);
    }
    if (coordenada1d == 32) {
        area.removeEventListener('mouseleave', a32u);
    }
    if (coordenada1d == 33) {
        area.removeEventListener('mouseleave', a33u);
    }
    if (coordenada1d == 34) {
        area.removeEventListener('mouseleave', a34u);
    }
    if (coordenada1d == 35) {
        area.removeEventListener('mouseleave', a35u);
    }
}
function retirareventoe(coordenada1d) {
    var area = document.getElementById('a' + coordenada1d)
    if (coordenada1d == 0) {
        area.removeEventListener('mouseenter', a0h);
    }
    if (coordenada1d == 1) {
        area.removeEventListener('mouseenter', a1h);
    }
    if (coordenada1d == 2) {
        area.removeEventListener('mouseenter', a2h);
    }
    if (coordenada1d == 3) {
        area.removeEventListener('mouseenter', a3h);
    }
    if (coordenada1d == 4) {
        area.removeEventListener('mouseenter', a4h);
    }
    if (coordenada1d == 5) {
        area.removeEventListener('mouseenter', a5h);
    }
    if (coordenada1d == 6) {
        area.removeEventListener('mouseenter', a6h);
    }
    if (coordenada1d == 7) {
        area.removeEventListener('mouseenter', a7h);
    }
    if (coordenada1d == 8) {
        area.removeEventListener('mouseenter', a8h);
    }
    if (coordenada1d == 9) {
        area.removeEventListener('mouseenter', a9h);
    }
    if (coordenada1d == 10) {
        area.removeEventListener('mouseenter', a10h);
    }
    if (coordenada1d == 11) {
        area.removeEventListener('mouseenter', a11h);
    }
    if (coordenada1d == 12) {
        area.removeEventListener('mouseenter', a12h);
    }
    if (coordenada1d == 13) {
        area.removeEventListener('mouseenter', a13h);
    }
    if (coordenada1d == 14) {
        area.removeEventListener('mouseenter', a14h);
    }
    if (coordenada1d == 15) {
        area.removeEventListener('mouseenter', a15h);
    }
    if (coordenada1d == 16) {
        area.removeEventListener('mouseenter', a16h);
    }
    if (coordenada1d == 17) {
        area.removeEventListener('mouseenter', a17h);
    }
    if (coordenada1d == 18) {
        area.removeEventListener('mouseenter', a18h);
    }
    if (coordenada1d == 19) {
        area.removeEventListener('mouseenter', a19h);
    }
    if (coordenada1d == 20) {
        area.removeEventListener('mouseenter', a20h);
    }
    if (coordenada1d == 21) {
        area.removeEventListener('mouseenter', a21h);
    }
    if (coordenada1d == 22) {
        area.removeEventListener('mouseenter', a22h);
    }
    if (coordenada1d == 23) {
        area.removeEventListener('mouseenter', a23h);
    }
    if (coordenada1d == 24) {
        area.removeEventListener('mouseenter', a24h);
    }
    if (coordenada1d == 25) {
        area.removeEventListener('mouseenter', a25h);
    }
    if (coordenada1d == 26) {
        area.removeEventListener('mouseenter', a26h);
    }
    if (coordenada1d == 27) {
        area.removeEventListener('mouseenter', a27h);
    }
    if (coordenada1d == 28) {
        area.removeEventListener('mouseenter', a28h);
    }
    if (coordenada1d == 29) {
        area.removeEventListener('mouseenter', a29h);
    }
    if (coordenada1d == 30) {
        area.removeEventListener('mouseenter', a30h);
    }
    if (coordenada1d == 31) {
        area.removeEventListener('mouseenter', a31h);
    }
    if (coordenada1d == 32) {
        area.removeEventListener('mouseenter', a32h);
    }
    if (coordenada1d == 33) {
        area.removeEventListener('mouseenter', a33h);
    }
    if (coordenada1d == 34) {
        area.removeEventListener('mouseenter', a34h);
    }
    if (coordenada1d == 35) {
        area.removeEventListener('mouseenter', a35h);
    }
}
function criareventoe(coordenada1d) {
    var area = document.getElementById('a' + coordenada1d)
    if (coordenada1d == 0) {
        area.addEventListener('mouseenter', a0h);
    }
    if (coordenada1d == 1) {
        area.addEventListener('mouseenter', a1h);
    }
    if (coordenada1d == 2) {
        area.addEventListener('mouseenter', a2h);
    }
    if (coordenada1d == 3) {
        area.addEventListener('mouseenter', a3h);
    }
    if (coordenada1d == 4) {
        area.addEventListener('mouseenter', a4h);
    }
    if (coordenada1d == 5) {
        area.addEventListener('mouseenter', a5h);
    }
    if (coordenada1d == 6) {
        area.addEventListener('mouseenter', a6h);
    }
    if (coordenada1d == 7) {
        area.addEventListener('mouseenter', a7h);
    }
    if (coordenada1d == 8) {
        area.addEventListener('mouseenter', a8h);
    }
    if (coordenada1d == 9) {
        area.addEventListener('mouseenter', a9h);
    }
    if (coordenada1d == 10) {
        area.addEventListener('mouseenter', a10h);
    }
    if (coordenada1d == 11) {
        area.addEventListener('mouseenter', a11h);
    }
    if (coordenada1d == 12) {
        area.addEventListener('mouseenter', a12h);
    }
    if (coordenada1d == 13) {
        area.addEventListener('mouseenter', a13h);
    }
    if (coordenada1d == 14) {
        area.addEventListener('mouseenter', a14h);
    }
    if (coordenada1d == 15) {
        area.addEventListener('mouseenter', a15h);
    }
    if (coordenada1d == 16) {
        area.addEventListener('mouseenter', a16h);
    }
    if (coordenada1d == 17) {
        area.addEventListener('mouseenter', a17h);
    }
    if (coordenada1d == 18) {
        area.addEventListener('mouseenter', a18h);
    }
    if (coordenada1d == 19) {
        area.addEventListener('mouseenter', a19h);
    }
    if (coordenada1d == 20) {
        area.addEventListener('mouseenter', a20h);
    }
    if (coordenada1d == 21) {
        area.addEventListener('mouseenter', a21h);
    }
    if (coordenada1d == 22) {
        area.addEventListener('mouseenter', a22h);
    }
    if (coordenada1d == 23) {
        area.addEventListener('mouseenter', a23h);
    }
    if (coordenada1d == 24) {
        area.addEventListener('mouseenter', a24h);
    }
    if (coordenada1d == 25) {
        area.addEventListener('mouseenter', a25h);
    }
    if (coordenada1d == 26) {
        area.addEventListener('mouseenter', a26h);
    }
    if (coordenada1d == 27) {
        area.addEventListener('mouseenter', a27h);
    }
    if (coordenada1d == 28) {
        area.addEventListener('mouseenter', a28h);
    }
    if (coordenada1d == 29) {
        area.addEventListener('mouseenter', a29h);
    }
    if (coordenada1d == 30) {
        area.addEventListener('mouseenter', a30h);
    }
    if (coordenada1d == 31) {
        area.addEventListener('mouseenter', a31h);
    }
    if (coordenada1d == 32) {
        area.addEventListener('mouseenter', a32h);
    }
    if (coordenada1d == 33) {
        area.addEventListener('mouseenter', a33h);
    }
    if (coordenada1d == 34) {
        area.addEventListener('mouseenter', a34h);
    }
    if (coordenada1d == 35) {
        area.addEventListener('mouseenter', a35h);
    }
}
function a0h() {
    highlighter(0);
}
function a1h() {
    highlighter(1);
}
function a2h() {
    highlighter(2);
}
function a3h() {
    highlighter(3);
}
function a4h() {
    highlighter(4);
}
function a5h() {
    highlighter(5);
}
function a6h() {
    highlighter(6);
}
function a7h() {
    highlighter(7);
}
function a8h() {
    highlighter(8);
}
function a9h() {
    highlighter(9);
}
function a10h() {
    highlighter(10);
}
function a11h() {
    highlighter(11);
}
function a12h() {
    highlighter(12);
}
function a13h() {
    highlighter(13);
}
function a14h() {
    highlighter(14);
}
function a15h() {
    highlighter(15);
}
function a16h() {
    highlighter(16);
}
function a17h() {
    highlighter(17);
}
function a18h() {
    highlighter(18);
}
function a19h() {
    highlighter(19);
}
function a20h() {
    highlighter(20);
}
function a21h() {
    highlighter(21);
}
function a22h() {
    highlighter(22);
}
function a23h() {
    highlighter(23);
}
function a24h() {
    highlighter(24);
}
function a25h() {
    highlighter(25);
}
function a26h() {
    highlighter(26);
}
function a27h() {
    highlighter(27);
}
function a28h() {
    highlighter(28);
}
function a29h() {
    highlighter(29);
}
function a30h() {
    highlighter(30);
}
function a31h() {
    highlighter(31);
}
function a32h() {
    highlighter(32);
}
function a33h() {
    highlighter(33);
}
function a34h() {
    highlighter(34);
}
function a35h() {
    highlighter(35);
}
function a0u() {
    unhighlighter(0);
}
function a1u() {
    unhighlighter(1);
}
function a2u() {
    unhighlighter(2);
}
function a3u() {
    unhighlighter(3);
}
function a4u() {
    unhighlighter(4);
}
function a5u() {
    unhighlighter(5);
}
function a6u() {
    unhighlighter(6);
}
function a7u() {
    unhighlighter(7);
}
function a8u() {
    unhighlighter(8);
}
function a9u() {
    unhighlighter(9);
}
function a10u() {
    unhighlighter(10);
}
function a11u() {
    unhighlighter(11);
}
function a12u() {
    unhighlighter(12);
}
function a13u() {
    unhighlighter(13);
}
function a14u() {
    unhighlighter(14);
}
function a15u() {
    unhighlighter(15);
}
function a16u() {
    unhighlighter(16);
}
function a17u() {
    unhighlighter(17);
}
function a18u() {
    unhighlighter(18);
}
function a19u() {
    unhighlighter(19);
}
function a20u() {
    unhighlighter(20);
}
function a21u() {
    unhighlighter(21);
}
function a22u() {
    unhighlighter(22);
}
function a23u() {
    unhighlighter(23);
}
function a24u() {
    unhighlighter(24);
}
function a25u() {
    unhighlighter(25);
}
function a26u() {
    unhighlighter(26);
}
function a27u() {
    unhighlighter(27);
}
function a28u() {
    unhighlighter(28);
}
function a29u() {
    unhighlighter(29);
}
function a30u() {
    unhighlighter(30);
}
function a31u() {
    unhighlighter(31);
}
function a32u() {
    unhighlighter(32);
}
function a33u() {
    unhighlighter(33);
}
function a34u() {
    unhighlighter(34);
}
function a35u() {
    unhighlighter(35);
}
function movetry0() {
    move(0);
}
function movetry1() {
    move(1);
}
function movetry2() {
    move(2);
}
function movetry3() {
    move(3);
}
function movetry4() {
    move(4);
}
function movetry5() {
    move(5);
}
function movetry6() {
    move(6);
}
function movetry7() {
    move(7);
}
function movetry8() {
    move(8);
}
function movetry9() {
    move(9);
}
function movetry10() {
    move(10);
}
function movetry11() {
    move(11);
}
function movetry12() {
    move(12);
}
function movetry13() {
    move(13);
}
function movetry14() {
    move(14);
}
function movetry15() {
    move(15);
}
function movetry16() {
    move(16);
}
function movetry17() {
    move(17);
}
function movetry18() {
    move(18);
}
function movetry19() {
    move(19);
}
function movetry20() {
    move(20);
}
function movetry21() {
    move(21);
}
function movetry22() {
    move(22);
}
function movetry23() {
    move(23);
}
function movetry24() {
    move(24);
}
function movetry25() {
    move(25);
}
function movetry26() {
    move(26);
}
function movetry27() {
    move(27);
}
function movetry28() {
    move(28);
}
function movetry29() {
    move(29);
}
function movetry30() {
    move(30);
}
function movetry31() {
    move(31);
}
function movetry32() {
    move(32);
}
function movetry33() {
    move(33);
}
function movetry34() {
    move(34);
}
function movetry35() {
    move(35);
}
const a0 = document.getElementById('a0');
a0.addEventListener('mouseleave', a0u);
a0.addEventListener('click', movetry0);
a0.addEventListener('mouseenter', a0h);
const a1 = document.getElementById('a1');
a1.addEventListener('mouseleave', a1u);
a1.addEventListener('click', movetry1);
a1.addEventListener('mouseenter', a1h);
const a2 = document.getElementById('a2');
a2.addEventListener('mouseenter', a2h);
a2.addEventListener('click', movetry2);
a2.addEventListener('mouseleave', a2u);
const a3 = document.getElementById('a3');
a3.addEventListener('mouseenter', a3h);
a3.addEventListener('click', movetry3);
a3.addEventListener('mouseleave', a3u);
const a4 = document.getElementById('a4');
a4.addEventListener('mouseenter', a4h);
a4.addEventListener('click', movetry4);
a4.addEventListener('mouseleave', a4u);
const a5 = document.getElementById('a5');
a5.addEventListener('mouseenter', a5h);
a5.addEventListener('click', movetry5);
a5.addEventListener('mouseleave', a5u);
const a6 = document.getElementById('a6');
a6.addEventListener('mouseenter', a6h);
a6.addEventListener('click', movetry6);
a6.addEventListener('mouseleave', a6u);
const a7 = document.getElementById('a7');
a7.addEventListener('mouseenter', a7h);
a7.addEventListener('click', movetry7);
a7.addEventListener('mouseleave', a7u);
const a8 = document.getElementById('a8');
a8.addEventListener('mouseenter', a8h);
a8.addEventListener('click', movetry8);
a8.addEventListener('mouseleave', a8u);
const a9 = document.getElementById('a9');
a9.addEventListener('mouseenter', a9h);
a9.addEventListener('click', movetry9);
a9.addEventListener('mouseleave', a9u);
const a10 = document.getElementById('a10');
a10.addEventListener('mouseenter', a10h);
a10.addEventListener('click', movetry10);
a10.addEventListener('mouseleave', a10u);
const a11 = document.getElementById('a11');
a11.addEventListener('mouseenter', a11h);
a11.addEventListener('click', movetry11);
a11.addEventListener('mouseleave', a11u);
const a12 = document.getElementById('a12');
a12.addEventListener('mouseenter', a12h);
a12.addEventListener('click', movetry12);
a12.addEventListener('mouseleave', a12u);
const a13 = document.getElementById('a13');
a13.addEventListener('mouseenter', a13h);
a13.addEventListener('click', movetry13);
a13.addEventListener('mouseleave', a13u);
const a14 = document.getElementById('a14');
a14.addEventListener('mouseenter', a14h);
a14.addEventListener('click', movetry14);
a14.addEventListener('mouseleave', a14u);
const a15 = document.getElementById('a15');
a15.addEventListener('mouseenter', a15h);
a15.addEventListener('click', movetry15);
a15.addEventListener('mouseleave', a15u);
const a16 = document.getElementById('a16');
a16.addEventListener('mouseenter', a16h);
a16.addEventListener('click', movetry16);
a16.addEventListener('mouseleave', a16u);
const a17 = document.getElementById('a17');
a17.addEventListener('mouseenter', a17h);
a17.addEventListener('click', movetry17);
a17.addEventListener('mouseleave', a17u);
const a18 = document.getElementById('a18');
a18.addEventListener('mouseenter', a18h);
a18.addEventListener('click', movetry18);
a18.addEventListener('mouseleave', a18u);
const a19 = document.getElementById('a19');
a19.addEventListener('mouseenter', a19h);
a19.addEventListener('click', movetry19);
a19.addEventListener('mouseleave', a19u);
const a20 = document.getElementById('a20');
a20.addEventListener('mouseenter', a20h);
a20.addEventListener('click', movetry20);
a20.addEventListener('mouseleave', a20u);
const a21 = document.getElementById('a21');
a21.addEventListener('mouseenter', a21h);
a21.addEventListener('click', movetry21);
a21.addEventListener('mouseleave', a21u);
const a22 = document.getElementById('a22');
a22.addEventListener('mouseenter', a22h);
a22.addEventListener('click', movetry22);
a22.addEventListener('mouseleave', a22u);
const a23 = document.getElementById('a23');
a23.addEventListener('mouseenter', a23h);
a23.addEventListener('click', movetry23);
a23.addEventListener('mouseleave', a23u);
const a24 = document.getElementById('a24');
a24.addEventListener('mouseenter', a24h);
a24.addEventListener('click', movetry24);
a24.addEventListener('mouseleave', a24u);
const a25 = document.getElementById('a25');
a25.addEventListener('mouseenter', a25h);
a25.addEventListener('click', movetry25);
a25.addEventListener('mouseleave', a25u);
const a26 = document.getElementById('a26');
a26.addEventListener('mouseenter', a26h);
a26.addEventListener('click', movetry26);
a26.addEventListener('mouseleave', a26u);
const a27 = document.getElementById('a27');
a27.addEventListener('mouseenter', a27h);
a27.addEventListener('click', movetry27);
a27.addEventListener('mouseleave', a27u);
const a28 = document.getElementById('a28');
a28.addEventListener('mouseenter', a28h);
a28.addEventListener('click', movetry28);
a28.addEventListener('mouseleave', a28u);
const a29 = document.getElementById('a29');
a29.addEventListener('mouseenter', a29h);
a29.addEventListener('click', movetry29);
a29.addEventListener('mouseleave', a29u);
const a30 = document.getElementById('a30');
a30.addEventListener('mouseenter', a30h);
a30.addEventListener('click', movetry30);
a30.addEventListener('mouseleave', a30u);
const a31 = document.getElementById('a31');
a31.addEventListener('mouseenter', a31h);
a31.addEventListener('click', movetry31);
a31.addEventListener('mouseleave', a31u);
const a32 = document.getElementById('a32');
a32.addEventListener('mouseenter', a32h);
a32.addEventListener('click', movetry32);
a32.addEventListener('mouseleave', a32u);
const a33 = document.getElementById('a33');
a33.addEventListener('mouseenter', a33h);
a33.addEventListener('click', movetry33);
a33.addEventListener('mouseleave', a33u);
const a34 = document.getElementById('a34');
a34.addEventListener('mouseenter', a34h);
a34.addEventListener('click', movetry34);
a34.addEventListener('mouseleave', a34u);
const a35 = document.getElementById('a35');
a35.addEventListener('mouseenter', a35h);
a35.addEventListener('click', movetry35);
a35.addEventListener('mouseleave', a35u);
function Inimigo() {
    this.coordx;
    this.coordy;
    this.coord1d;
    this.spawn = function (labirinto, inicioy, iniciox) {
        let areas = document.querySelectorAll('.area');
        let y;
        let x;
        do {
            y = Math.floor(Math.random() * 6);
            x = Math.floor(Math.random() * 6);
        } while (y == inicioy || x == iniciox)
        let coordenada1d = x + (y * 6);
        let nome = labirinto.identificartipo(y, x);
        areas[coordenada1d].innerHTML = '<img src="fundopreto' + nome + 'x.png" alt="locais" width=100% height=100%>'
        this.coordy = y;
        this.coordx = x;
        this.coord1d = x + (y * 6);
    }
    this.apaga = function (c1d, nome) {
        let areas = document.querySelectorAll('.area');
        if (areas[c1d].innerHTML.includes('fundopreto')) {
            if (areas[c1d].innerHTML.includes('y')) {
                areas[c1d].innerHTML = '<img src="fundopreto' + nome + 'y.png" alt="locais" width=100% height=100%>'
            } else {
                areas[c1d].innerHTML = '<img src="fundopreto' + nome + '.png" alt="locais" width=100% height=100%>'
            }
        } else {
            if (areas[c1d].innerHTML.includes('y')) {
                areas[c1d].innerHTML = '<img src="' + nome + 'y.png" alt="locais" width=100% height=100%>'
            } else {
                areas[c1d].innerHTML = '<img src="' + nome + '.png" alt="locais" width=100% height=100%>'
            }
        }
    }
    this.troca = async function (c1d, nome) {
        let mapa = identificador();
        this.coord1d = c1d;
        nome = mapa[Math.floor(c1d / 6)][c1d % 6];
        let areas = document.querySelectorAll('.area');
        if (areas[c1d].innerHTML.includes('fundopreto')) {
            if (areas[c1d].innerHTML.includes('y')) {
                areas[c1d].innerHTML = '<img src="fundopreto' + nome + 'yx.png" alt="locais" width=100% height=100%>'
            } else {
                areas[c1d].innerHTML = '<img src="fundopreto' + nome + 'x.png" alt="locais" width=100% height=100%>'
            }
        } else {
            if (areas[c1d].innerHTML.includes('y')) {
                areas[c1d].innerHTML = '<img src="' + nome + 'yx.png" alt="locais" width=100% height=100%>'
            } else {
                areas[c1d].innerHTML = '<img src="' + nome + 'x.png" alt="locais" width=100% height=100%>'
            }
        }
        this.coordy = Math.floor(this.coord1d / 6);
        this.coordx = this.coord1d % 6;
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function enemysetup(mapa, iny, inx) {
    let enemy = new Inimigo();
    enemy.spawn(mapa, iny, inx);
    while (true) {
        let qtd = JSON.parse(localStorage.getItem('score'));
        let tempo = 6000;
        if (qtd >= 5) tempo = 5000;
        if (qtd >= 15) tempo = 4000;
        if (qtd >= 25) tempo = 3000;
        await delay(tempo);
        let player = localizador();
        let player1d = player[1] + (player[0] * 6);
        let distanciax = 0;
        let distanciay = 0;
        if (player[0] > enemy.coordy) {
            distanciay = 1;
        }
        if (player[0] < enemy.coordy) {
            distanciay = -1;
        }
        if (player[1] > enemy.coordx) {
            distanciax = 1;
        }
        if (player[1] < enemy.coordx) {
            distanciax = -1;
        }
        let DSD = false;
        let DSE = false;
        let DID = false;
        let DIE = false;
        if (distanciax < 0 && distanciay < 0) {
            DSE = true;
        }
        if (distanciax > 0 && distanciay < 0) {
            DSD = true;
        }
        if (distanciax < 0 && distanciay > 0) {
            DIE = true;
        }
        if (distanciax > 0 && distanciay > 0) {
            DID = true;
        }
        let nome = mapa.identificartipo(enemy.coordy, enemy.coordx)
        if (DSD) {
            debugger;
            enemy.apaga(enemy.coord1d, nome);
            nome = mapa.identificartipo(enemy.coordy - 1, enemy.coordx + 1);
            enemy.troca(enemy.coord1d - 5, nome);
        }
        if (DSE) {
            debugger;
            enemy.apaga(enemy.coord1d, nome);
            nome = mapa.identificartipo(enemy.coordy - 1, enemy.coordx - 1);
            enemy.troca(enemy.coord1d - 7, nome);
        }
        if (DID) {
            debugger;
            enemy.apaga(enemy.coord1d, nome);
            nome = mapa.identificartipo(enemy.coordy + 1, enemy.coordx + 1);
            enemy.troca(enemy.coord1d + 7, nome);
        }
        if (DIE) {
            debugger;
            enemy.apaga(enemy.coord1d, nome);
            nome = mapa.identificartipo(enemy.coordy + 1, enemy.coordx - 1);
            enemy.troca(enemy.coord1d + 5, nome);
        }
        if (!(DSD || DSE || DID || DIE)) {
            if (distanciax > 0) {
                enemy.apaga(enemy.coord1d, nome);
                enemy.troca(enemy.coord1d + 1, nome);

            }
            if (distanciax < 0) {
                enemy.apaga(enemy.coord1d, nome);
                enemy.troca(enemy.coord1d - 1, nome);
            }
            if (distanciay > 0) {
                enemy.apaga(enemy.coord1d, nome);
                enemy.troca(enemy.coord1d + 6, nome);
            }
            if (distanciay < 0) {
                enemy.apaga(enemy.coord1d, nome);
                enemy.troca(enemy.coord1d - 6, nome);
            }
        }
        let audio = document.getElementById('enemymoving');
        audio.play();
        await delay(2000);
        if (enemy.coord1d == player1d) {
            window.location.href = 'gameover.html';
        }
    }
}
function localizar() {
    let areas = document.querySelectorAll('.area');
    for (let i = 0; i < 36; i++) {
        if (areas[i].innerHTML.includes('x')) {
            return i;
        }
    }
}
async function piscar(mapa) {
    let areas = document.querySelectorAll('.area');
    for (let i = 0; i < 36; i++) {
        if (areas[i].innerHTML.includes('y')) {
            var k = i;
        }
    }
    let y = Math.floor(k / 6);
    let x = k % 6;
    let nome = mapa.identificartipo(y, x)
    areas[k].innerHTML = '<img src="' + nome + 'y.png" alt="locais" width=100% height=100%>';
    await delay(500);
    areas[k].innerHTML = '<img src="fundopreto' + nome + 'y.png" alt="locais" width=100% height=100%>';
}