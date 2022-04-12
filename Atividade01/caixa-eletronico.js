// console.log("Inicializando...");

const valor = document.getElementById("valor");

const notas = document.getElementById("notas");

const botaoSacar = document.getElementById('botaoSacar');

function sacar(event) {
    event.preventDefault();
    console.log(valor.value);
    notas.textContent = calcularNotas(valor.value);
}

botaoSacar.addEventListener('click', sacar);

class ValorASacar {
    constructor(valor) {
        this.valorTotal = valor;
    }

    get valorTotal() {
        return this._valorTotal;
    }

    set valorTotal(valor) {
        this._valorTotal = valor;
    }

    get unidade() {
        return this._valorTotal % 10;
    }

    set unidade(unidade) {
        this.valorTotal = this.centena * 100 + this.dezena * 10 + unidade;
    }

    get dezena() {
        const dez = (this._valorTotal - this.unidade) % 100;
        return dez / 10;
    }

    set dezena(dezena) {
        this.valorTotal = this.centena * 100 + dezena * 10 + this.unidade;
    }


    get centena() {
        const cem = this._valorTotal - this.dezena * 10 - this.unidade;
        // console.log(`Tenho aqui: ${this._valorTotal} - ${this.dezena*10} - ${this.unidade} = ${cem}`);
        return cem / 100;
    }

    set centena(centena) {
        this.valorTotal = centena * 100 + this.dezena + this.unidade;
    }

}

function calcularNotas(valorString) {
    const valorInteiro = parseInt(valorString);
    console.log(`Converti o valor: ${valorInteiro}`);

    // O valor mínimo para saque é de 10 reais e o máximo de 600 reais.
    if (isNaN(valorInteiro)) {
        return "erro: valor inválido";
    } else if (valorInteiro < 10) {
        return "erro: o valor mínimo é 10";
    } else if (valorInteiro > 600) {
        return "erro: o valor máximo é 600";
    }

    let numero = new ValorASacar(valorInteiro);

    // console.log(`${numero.centena} + ${numero.dezena} + ${numero.unidade}`);

    let notas = [];

    // As notas disponíveis serão as de 2, 5, 10, 20, 50 e 100 reais.

    let cincos = 0;
    let doises = 0;
    let dezes = 0;
    let vintes = 0;
    let cinquentas = 0;
    let cens = 0;

    // unidades
    {
        if (numero.dezena >= 1 && numero.unidade === 1) {
            // transforma em 9

            numero.valorTotal -= 2;
            doises += 1;
        } else if (numero.dezena >= 1 && numero.unidade === 3) {
            // transforma em 9

            numero.valorTotal -= 4;
            doises += 2; // coloca dois número 2
        }


        if (numero.unidade === 9) {
            cincos += 1;
            doises += 2;
            numero.valorTotal -= 9;
        } else if (numero.unidade === 8) {
            doises += 4;
            numero.valorTotal -= 8;
        } else if (numero.unidade === 7) {
            cincos += 1;
            doises += 1;
            numero.valorTotal -= 7;
        } else if (numero.unidade === 6) {
            doises += 3;
            numero.valorTotal -= 6;
        } else if (numero.unidade === 5) {
            cincos += 1;
            numero.valorTotal -= 5;
        } else if (numero.unidade === 4) {
            doises += 2;
            numero.unidade -= 4;
        } else if (numero.unidade === 2) {
            doises += 1;
            numero.valorTotal -= 2;
        }

        /*        // notas de 2
                {
                    const doisesRestantes = Math.floor(numero.unidade / 2);
                    doises += doisesRestantes;
                    numero.unidade -= doisesRestantes * 2;
                }

                // notas de 5
                {
                    const cincosRestantes = Math.floor(numero.unidade / 5);
                    cincos += cincosRestantes;
                    numero.unidade -= cincosRestantes * 5;
                }*/


    }


    // notas de 50
    cinquentas = Math.floor(numero.dezena / 5);
    numero.dezena -= 5 * cinquentas;


    // notas de 20
    vintes = Math.floor(numero.dezena / 2);
// console.log(`Tenho aqui ${vintes} notas de vinte`);
    numero.dezena -= 2 * vintes;

    // notas de 10
    dezes = Math.floor(numero.dezena / 1);
    numero.dezena -= dezes;


    if (numero.centena > 0) {
        cens = numero.centena;
        notas.push(`${cens} notas de 100`);
        numero.centena -= cens;
    }

    if (cinquentas !== 0) {
        notas.push(`${cinquentas} notas de 50`);
    }

    if (vintes !== 0) {
        notas.push(`${vintes} notas de 20`);
    }

    if (dezes !== 0) {
        notas.push(`${dezes} notas de 10`);
    }

    if (cincos !== 0) {
        notas.push(`${cincos} notas de 5`);
    }

    if (doises !== 0) {
        notas.push(`${doises} notas de 2`);
    }

    if (numero.valorTotal !== 0) {
        notas.push(`Sobrou ${numero.valorTotal}`);
    }

    const soma = 100 * cens
        + 50 * cinquentas
        + 20 * vintes
        + 10 * dezes
        + 5 * cincos
        + 2 * doises;
    return notas.join(", ") + ` (Soma: ${soma})`;
}

/*
function calcularNotas2(valorString) {
    const valorInteiro = parseInt(valorString);
    console.log(`Converti o valor: ${valorInteiro}`);

    // O valor mínimo para saque é de 10 reais e o máximo de 600 reais.
    if (isNaN(valorInteiro)) {
        return "erro: valor inválido";
    } else if (valorInteiro < 10) {
        return "erro: o valor mínimo é 10";
    } else if (valorInteiro > 600) {
        return "erro: o valor máximo é 600";
    }

    let unidade = valorInteiro % 10;
    let dezena = (valorInteiro - unidade) % 100;
    let dezenaUnidade = unidade + dezena;
    let centena = (valorInteiro - dezena - unidade);

    console.log(`${centena} + ${dezena} + ${unidade}`);

    let notas = [];

    // As notas disponíveis serão as de 2, 5, 10, 20, 50 e 100 reais.

    // unidades
    {
        let unidadeParcial = unidade;
        let cincos = 0;
        let doises = 0;

        if (dezena >= 10 && unidadeParcial === 1) {
            // transforma em 9

            dezena -= 10; // diminui a dezena
            doises += 1; // coloca um número 2
            unidadeParcial -= 1; // remove o 1
        } else if (dezena >= 10 && unidadeParcial === 3) {
            // transforma em 9

            dezena -= 10; // diminui a dezena
            doises += 2; // coloca dois número 2
            unidadeParcial -= 3; // remove o 3
        }

        if (unidadeParcial === 9) {
            cincos += 1;
            doises += 2;
            unidadeParcial -= 9;
        } else if (unidadeParcial === 7) {
            cincos += 1;
            doises += 1;
            unidadeParcial -= 7;
        } else if (unidadeParcial === 5) {
            cincos += 1;
            unidadeParcial -= 5;
        }

        // notas de 2
        {
            const doisesRestantes = Math.floor(unidadeParcial / 2);
            doises += doisesRestantes;
            unidadeParcial -= doisesRestantes * 2;
        }

        // notas de 5
        {
            const cincosRestantes = Math.floor(unidadeParcial / 5);
            cincos += cincosRestantes;
            unidadeParcial -= cincosRestantes * 5;
        }

        if (doises !== 0) {
            notas.push(`${doises} notas de 2`);
        }

        if (cincos !== 0) {
            notas.push(`${cincos} notas de 5`);
        }

        if (unidadeParcial !== 0) {
            notas.push(`Sobrou ${unidadeParcial}`);
        }


    }


    {
        let dezenaParcial = dezena;

        // notas de 50
        {
            const cinquentas = Math.floor(dezenaParcial / 50);
            if (cinquentas !== 0) {
                notas.push(`${cinquentas} notas de 50`);
                dezenaParcial -= cinquentas * 50;
            }
        }

        // notas de 20
        {
            const vintes = Math.floor(dezenaParcial / 20);
            if (vintes !== 0) {
                notas.push(`${vintes} notas de 20`);
                dezenaParcial -= vintes * 20;
            }
        }

        // notas de 10
        {
            const dezes = Math.floor(dezenaParcial / 10);
            if (dezes !== 0) {
                notas.push(`${dezes} notas de 10`);
                dezenaParcial -= dezes * 10;
            }
        }
    }

    // notas de 100
    {
        const centenas = centena / 100;
        if (centenas > 0) {
            notas.push(`${centenas} notas de 100`);
        }
    }


    return notas.join(", ");
}*/
