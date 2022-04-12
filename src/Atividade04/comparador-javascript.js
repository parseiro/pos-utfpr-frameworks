// Como executar: node .\comparador-javascript.js

class Posto {
    constructor(nome, precoGasolina, precoEtanol) {
        this._nome = nome;
        this._gasolina =  new Combustivel("Gasolina", precoGasolina);
        this._etanol =  new Combustivel("Etanol", precoEtanol);
    }

    get nome() {
        return this._nome;
    }

    get gasolina() {
        return this._gasolina;
    }

    get etanol() {
        return this._etanol;
    }

    sugereCombustivel() {
        const relacao = this.etanol.preco / this.gasolina.preco;

        console.log(`Posto: ${this.nome}: Relação etanol : gasolina = ${relacao} -- Compensa abastecer com ${relacao < 0.7 ? 'etanol' : 'gasolina'}`);

        if (relacao < 0.70) {
            return this.etanol;
        } else {
            return this.gasolina;
        }
    }
}

class Combustivel {
    constructor(tipo, preco) {
        this._tipo = tipo;
        this._preco = preco;
    }

    get tipo() {
        return this._tipo;
    }

    get preco() {
        return this._preco;
    }
}

console.log('** Rodando a versão Javascript ES6 **');

const posto1 = new Posto("Cinco Estrelas", 7.39, 5.49);
const posto2 = new Posto("Do Mel IV", 7.36, 5.46);
const posto3 = new Posto("Chimarrão", 7.42, 5.18);

posto1.sugereCombustivel();
posto2.sugereCombustivel();
posto3.sugereCombustivel();