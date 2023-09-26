//IMPORTANDO O MÓDULO EXPRESS
const express = require("express");

//IMPORTANDO O MODELO DO PRODUTO 
const produtoModel = require("../model/Produto");

//IMPORTANDO COMANDO "WHERE" DO SEQUELIZE
const { where } = require("sequelize");

//IMPORTANDO O MÉTODO DE ROTAS DO EXPRESS
const router = express.Router();

//ROTA PARA CADASTRO DE PRODUTO (POST)
router.post("/produto/cadastroProduto", (req, res) =>{
    let { nome_produto, codigo_categoria, valor_produto, imagem_produto, descricao_produto } = req.body;//REQUISIÇÃO NO CORPO PARA EXIBIÇÃO DOS DADOS EM JSON 

    produtoModel.create({nome_produto, codigo_categoria, valor_produto, imagem_produto, descricao_produto})//FUNÇÃO CREATE USADA PARA FAZER INSERTS NO BANCO DE DADOS
    .then(() => {
        //RETORNO APÓS A EXECUÇÃO DA FUNÇÃO CREATE, RETORNAM SUAS POSSÍVEIS RESPOSTAS
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Produto cadastrado com sucesso!"
        });
    })
    //RETORNO CASO ALGUM ERRO SEJA DETECTADO
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});

//ROTA PARA LISTAGEM DE PRODUTOS (GET)
router.get("/produto/listarProduto", (req, res) => {
    produtoModel.findAll()//MÉTODO PARA ENCONTRAR E LISTAR TODOS OS DADOS DO BANCO DE DADOS
    .then((produtos) => {
        //RETORNO DA REPOSTA QUE FORA ATRIBUIDO NO PARÂMETRO "produtos" 
        return res.status(200).json({
            errorStatus: false,
            messageStatus: "Produtos listados com sucesso!",
            produtos: produtos
        });
    })
    //RETORNO CASO ALGUM ERRO SEJA DETECTADO
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});

//ROTA PARA ALTERAÇÃO DE PRODUTOS (PUT)
router.put("/produto/editProduto/:id", (req, res) => {
    produtoModel.update({//MÉTODO PARA ATUALIZAR OS DADOS DO MODELO DE DADOS
    //DADOS A SEREM ALTERADOS 
        nome_produto: req.body.nome_produto,
        codigo_categoria: req.body.codigo_categoria,
        valor_produto: req.body.valor_produto,
        imagem_produto: req.body.imagem_produto,
        descricao_produto: req.body.descricao_produto,
    },
        {//CONDIÇÃO QUE ESPECIFÍCA QUE O PRODUTO A SER ALTERADO É ESPECIFICADO PELO REQUISITO "id"
        where: {
            codigo_produto: req.params.id,
        },
    })
    .then((produtoModel) => {
        //CONDIÇÃO QUE RETORNA UM ERRO CASO O CÓDIGO NÃO EXISTA NO BANCO DE DADOS
        if (!produtoModel){
        return res.status(404).json({
                errorStatus: true,
                messageStatus: "Produto não encontrado!",
            });
        };
    })
    .then(() =>{ 
        //RETORNO CASO OS PRODUTOS TENHAM SIDO ALTERADOS
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Produtos atualizados com sucesso!",
        });
    })
    //RETORNO CASO ALGUM ERRO SEJA DETECTADO
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});

//ROTA PARA EXCLUSÃO DE PRODUTOS
router.delete("/produto/deleteProduto/:id", (req, res) => {
    produtoModel.destroy({//MÉTODO PARA EXCLUSÃO DE PRODUTOS
        where: {//CONDIÇÃO QUE ESPECIFÍCA QUE O PRODUTO A SER EXCLUÍDO É ESPECIFICADO PELO REQUISITO "id"
            codigo_produto: req.params.id
        },
    })
    .then((produtoModel) => {
        //CONDIÇÃO QUE RETORNA UM ERRO CASO O CÓDIGO NÃO EXISTA NO BANCO DE DADOS
        if (!produtoModel){
            return res.status(404).json({
                errorStatus: true,
                messageStatus: "Produto não encontrado!"
            });
        };
    })
    //RETORNO CASO O PRODUTO TENHA SIDO DELETADO
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Produto deletado com sucesso",
        });
    })
    //RETORNO CASO ALGUM ERRO SEJA DETECTADO
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    }); 
});

//EXPORTANDO O ROUTER
module.exports = router;