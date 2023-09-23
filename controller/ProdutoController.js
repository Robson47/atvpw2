const express = require("express");
const produtoModel = require("../model/Produto");
const router = express.Router();

router.post("/produto/cadastrarProduto", (req, res) =>{
    let {nome_produto, valor_produto, imagem_produto, descricao_produto } = req.body;
    const ProdutoPost = produtoModel.create({nome_produto, valor_produto, imagem_produto, descricao_produto});
    

    console.log(nome_produto);
    console.log(valor_produto);
    console.log(imagem_produto);
    console.log(descricao_produto);

    ProdutoPost
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Produto cadastrado com sucesso!"
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});

router.get("/produto/listarProduto", (req, res) => {
    let {produtoModel} = req.body;
    const ProdutoGet = produtoModel

    console.log(ProdutoGet);

    produtoModel.execute("SELECT * FROM tbl_produtos")
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "tbl_produtos"
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });

})

module.exports = router;