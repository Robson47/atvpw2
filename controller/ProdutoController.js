const express = require("express");
const produtoModel = require("../model/Produto");
const router = express.Router();

router.post("/produto/cadastrarProduto", (req, res) =>{
    let {nome_produto, valor_produto, imagem_produto, descricao_produto } = req.body;
    const ProdutoPost = produtoModel.create({nome_produto, valor_produto, imagem_produto, descricao_produto, codigo_produto});

    console.log(codigo_produto);
    console.log(nome_produto);
    console.log(valor_produto);
    console.log(imagem_produto);
    console.log(descricao_produto);

    ProdutoPost
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: `Produto ${nome_produto}, valor ${valor_produto}, imagem ${imagem_produto} e descrição ${descricao_produto} cadastrado com sucesso!`
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});

module.exports = router;