// Como compilar: tsc comparador-typescript.ts --target es6
// Como executar: node .\comparador-typescript.js

class Posto {
    private _nome: string;
    private _gasolina: Combustivel;
    private _etanol: Combustivel;

    constructor(nome: string, precoGasolina: number, precoEtanol: number) {
        this._nome = nome;
        this._gasolina =  new Combustivel("Gasolina", precoGasolina);
        this._etanol =  new Combustivel("Etanol", precoEtanol);
    }


    get nome(): string {
        return this._nome;
    }

    get gasolina(): Combustivel {
        return this._gasolina;
    }

    get etanol(): Combustivel {
        return this._etanol;
    }

    sugereCombustivel(): Combustivel {
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
    private _tipo: string;
    private _preco: number;

    constructor(tipo: string, preco: number) {
        this._tipo = tipo;
        this._preco = preco;
    }

    get tipo(): string {
        return this._tipo;
    }

    get preco(): number {
        return this._preco;
    }
}

console.log('** Rodando a versão TypeScript **');

const posto1 = new Posto("Cinco Estrelas", 7.39, 5.49);
const posto2 = new Posto("Do Mel IV", 7.36, 5.46);
const posto3 = new Posto("Chimarrão", 7.42, 5.18);

posto1.sugereCombustivel();
posto2.sugereCombustivel();
posto3.sugereCombustivel();