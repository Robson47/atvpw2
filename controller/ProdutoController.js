const express = require("express");
const produtoModel = require("../model/Produto");
const router = express.Router();

router.post("/produto/cadastrarProduto", (req, res) =>{
    let {nome_produto} = req.body;
    console.log(nome_produto);

    produtoModel.create({nome_produto})
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Produto foi inserido com êxito"
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