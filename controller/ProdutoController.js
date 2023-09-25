const express = require("express");
const produtoModel = require("../model/Produto");
const { where } = require("sequelize");
const router = express.Router();

router.post("/produto/cadastroProduto", (req, res) =>{
    let { nome_produto, valor_produto, imagem_produto, descricao_produto } = req.body;
    
    console.log(nome_produto);
    console.log(valor_produto);
    console.log(imagem_produto);
    console.log(descricao_produto);

    produtoModel.create({nome_produto, valor_produto, imagem_produto, descricao_produto})
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
    produtos = produtoModel.findAll()
    .then((produtos) => {
        return res.status(200).json({
            errorStatus: false,
            messageStatus: "Produtos listados com sucesso!",
            produtos: produtos
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });

    router.delete("produto/deletarProduto/:codigo_produto", (req, res)=> {
    })

    router.put("/produto/editProduto/:codigo_produto", (req, res) => {
        let idProduto = req.params;
        let produto = req.body;
        where (idProduto == {codigo_produto})
        .then((produto) => {
            return res.status(200).json({
                errorStatus: false,
                messageStatus: "Produtos editados",
                produtos: produto
            });
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error
            });
        });

    })
});

module.exports = router;