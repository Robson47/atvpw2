//IMPORTANDO O MÓDULO EXPRESS
const express = require("express");

//IMPORTANDO O MODELO DO PRODUTO 
const produtoModel = require("../model/Produto");

//IMPORTANDO COMANDO "WHERE" DO SEQUELIZE
const { where } = require("sequelize");

//IMPORTANDO A CONEXÃO
const router = express.Router();

router.post("/produto/cadastroProduto", (req, res) =>{
    let { nome_produto, valor_produto, imagem_produto, descricao_produto } = req.body;

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
});
router.put("/produto/editProduto/:id", (req, res) => {
    let { codigo_produto } = req.params;
    let { nome_produto, valor_produto, imagem_produto, descricao_produto } = req.body;
    produtoModel.update({
        nome_produto: req.body.nome_produto,
        valor_produto: req.body.valor_produto,
        imagem_produto: req.body.imagem_produto,
        descricao_produto: req.body.descricao_produto,
      },
      {
        where: {
          codigo_produto: req.params.id,
        },
      }
    )
    .then((produtoModel) => {
        if (!produtoModel){
        return res.status(404).json({
            errorStatus: true,
            messageStatus: "Produto não encontrado!",
        });
    };
    })
    .then((produtoUpdate) =>{ 
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Produtos atualizados com sucesso!",
            produtoUp: produtoUpdate
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});
router.delete("/produto/deleteProduto/:id", (req, res) => {
let { codigo_produto } = req.params;
    produtoModel.destroy({
        where: {
            codigo_produto: req.params.id
        },
    })
    .then((produtoModel) => {
        if (!produtoModel){
            return res.status(404).json({
                errorStatus: true,
                messageStatus: "Produto não encontrado!"
            });
        };
    })
    .then((produtoDeleted) => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Produto deletado com sucesso",
            produtoDelete: produtoDeleted
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