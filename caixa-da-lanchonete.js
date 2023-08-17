class CaixaDaLanchonete {
    cardapio = [
        {
            codigo: "cafe", valor: 3,
        }, {
            codigo: "chantily", valor: 1.50,
        }, {
            codigo: "suco", valor: 6.20,
        }, {
            codigo: "sanduiche", valor: 6.50,
        }, {
            codigo: "queijo", valor: 2,
        }, {
            codigo: "salgado", valor: 7.25,
        }, {
            codigo: "combo1", valor: 9.50
        }, {
            codigo: "combo2", valor: 7.50,
        }
    ]
    codigo = []
    quantidade = []
    carrinho = []
    preco = []
    metodoDePagamento = ""
    calcularValorDaCompra = (metodoDePagamento, itens) => {
        this.metodoDePagamento = metodoDePagamento
        const [compra] = itens
        const separando = compra.split(",")
        this.codigo.push(separando[0])
        this.quantidade.push(separando[1])
        this.carrinho.push(this.codigo)
               
        const produto = this.cardapio.find((produto) => {
            return produto.codigo == this.codigo
        })

        this.preco.push(produto.valor)

        if (!this.verificarRegras()) {
            return this.valorDaCompra(this.preco, this.quantidade)
        }
    }
    verificarRegras = () => {
        if (!this.temPrincipal(this) &&
            !this.temCarrinho(this.carrinho) &&
            !this.temQuantidade(this.quantidade) &&
            !this.temItem(this.cardapio)) {
            return this.verificarRegras
        }
    }
    valorDaCompra = (preco, quantidade) => {
if(!this.verificarRegras()){
        let total = this.preco * this.quantidade
        let formaDePagamento = (metodoDePagamento) => {
            if (metodoDePagamento == "dinheiro") {
                return total -= total * 0.05
            } else if (metodoDePagamento == "credito") {
                return total += total * 0.03
            } else if (metodoDePagamento == "debito") {
                return total
            } else {
                return "Forma de pagamento inválida"
            }
        }

        return formaDePagamento(this.metodoDePagamento)
    }
    }
    temPrincipal = (temPrincipal1, temExtra1, temPrincipal2, temExtra2) => {
        temPrincipal1 = this.codigo.some((codigo) => {
            return codigo == "cafe"
        })
        temPrincipal2 = this.codigo.some((codigo) => {
            return codigo == "sanduiche"
        })
        temExtra1 = this.codigo.some((codigo) => {
            return codigo == "chantily"
        })
        temExtra2 = this.codigo.some((codigo) => {
            return codigo == "queijo"
        })
        if (temExtra1 || temExtra2) {
            if (!temPrincipal1 || !temPrincipal2) {
                console.log("Item extra não pode ser pedido sem o principal")
            }
        }
    }
    temCarrinho = (carrinho) => {
        if (this.carrinho.length == 0) {
            console.log("Não há itens no carrinho de compra!")
        }

    }
    temQuantidade = (quantidade) => {
        let zero = this.quantidade.some((qtd) => {
            qtd == ""
            return console.log("Quantidade inválida!")
        })
        }
    temItem = (codigo) => {
        let item = this.cardapio.some((codigo) => {
            return codigo == this.cardapio
        })
    }

}

console.log(new CaixaDaLanchonete().calcularValorDaCompra("dinheiro", ["cafe,"]))

//export { CaixaDaLanchonete };
