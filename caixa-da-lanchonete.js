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
    calcularValorDaCompra = (metodoDePagamento, itens) => {
        const verificaçãoExtra = []
        const verificaçãoCarrinhoeQtd = []
        let produtoexistente = 0
        let valorDaCompra = 0
        itens.forEach(item => {                                             //VALOR A PAGAR
            const codigoequantidade = item.split(",")                       //
            const codigo = codigoequantidade[0] == "" ? false : codigoequantidade[0]                            //
            verificaçãoCarrinhoeQtd.push(codigo)
            const quantidade = codigoequantidade[1]                         //
            verificaçãoCarrinhoeQtd.push(quantidade)
            const produto = codigo == 0 ? false : this.cardapio.find((produto) => {             //
                return produto.codigo == codigo                             //
            })                                                              //
            produtoexistente = produto
            const preco = produto == false || produto == undefined ? 0 : produto.valor                                     //
            valorDaCompra += preco * quantidade                             // 
            verificaçãoExtra.push(codigo)
        })
        if (metodoDePagamento === "dinheiro") {                             // METODO DE PAGAMENTO
            valorDaCompra -= valorDaCompra * 0.05                           //
        } else if (metodoDePagamento === "credito") {                       //
            valorDaCompra += valorDaCompra * 0.03                           //
        } else if (metodoDePagamento == "debito") {                         //
            valorDaCompra = valorDaCompra                                   //
        } else { metodoDePagamento = false }                                //

        const extraChantily = verificaçãoExtra.some((extra) => {             // EXTRA 
            return extra == "chantily"
        })
        const extraQueijo = verificaçãoExtra.some((extra) => {               // EXTRA
            return extra == "queijo"
        })


        valorDaCompra = valorDaCompra.toFixed(2)                            //FORMATAÇAO VALOR DA COMPRA
        let valorDaCompraString = `${valorDaCompra}`                        //
        let valorDaCompraFormatado = "R$ " + valorDaCompraString.replace(".", ",")//

        if (extraChantily == true) {                                          //VERIFICACAO PRINCIPAL
            const temPrincipal = verificaçãoExtra.some((extra) => {          //
                return extra == "cafe"                                      //
            })                                                              //
            if (!temPrincipal) {
                valorDaCompraFormatado = "Item extra não pode ser pedido sem o principal"

            }
        }
        if (extraQueijo == true) {                                            //
            const temPrincipal = verificaçãoExtra.some((extra) => {
                return extra == "sanduiche"
            })
            if (!temPrincipal) {
                valorDaCompraFormatado = "Item extra não pode ser pedido sem o principal"

            }
        }
        if (verificaçãoCarrinhoeQtd[0] == "") {                               // VERIFICACOES REGRAS
            valorDaCompraFormatado = "Não há itens no carrinho de compra!"
        } else if (produtoexistente == 0) {                               // VERIFICACOES REGRAS
            valorDaCompraFormatado = "Não há itens no carrinho de compra!"
        }
        else if (produtoexistente == undefined) {
            valorDaCompraFormatado = "Item inválido!"
        } else if (verificaçãoCarrinhoeQtd[1] == 0) {
            valorDaCompraFormatado = "Quantidade inválida!"
        }
        const pagamentoValido = metodoDePagamento == false ? valorDaCompraFormatado = "Forma de pagamento inválida!" : valorDaCompraFormatado
        return valorDaCompraFormatado
    }

}
console.log(new CaixaDaLanchonete().calcularValorDaCompra("dinheiro", ["cafe,1"]))

export { CaixaDaLanchonete };
