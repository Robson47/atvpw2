//IMPORTANDO O MÓDULO EXPRESS
const express = require("express");

//IMPORTANDO O MODELO DA CATEGORIA
const categoriaModel = require("../model/Categoria");

//IMPORTANDO COMANDO "WHERE" DO SEQUELIZE
const { where } = require("sequelize");

//IMPORTANDO O MÉTODO DE ROTAS DO EXPRESS
const router = express.Router();

//ROTA PARA CADASTRO DE CATEGORIA (POST)
router.post("/categoria/cadastrarCategoria", (req, res) =>{
    let { nome_categoria, observacoes_categoria } = req.body;//REQUISIÇÃO NO CORPO PARA EXIBIÇÃO DOS DADOS EM JSON

    categoriaModel.create({nome_categoria, observacoes_categoria})//FUNÇÃO CREATE USADA PARA FAZER INSERTS NO BANCO DE DADOS
    .then(() => {
        //RETORNO APÓS A EXECUÇÃO DA FUNÇÃO CREATE, RETORNAM SUAS POSSÍVEIS RESPOSTAS
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Categoria foi inserida com êxito"
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

//ROTA PARA LISTAGEM DE CATEGORIAS (GET)
router.get("/categoria/listarCategoria", (req, res) => {
    categoriaModel.findAll()//MÉTODO PARA ENCONTRAR E LISTAR TODOS OS DADOS DO BANCO DE DADOS
    .then((categorias) => {
        //RETORNO DA REPOSTA QUE FORA ATRIBUIDO NO PARÂMETRO "categorias" 
        return res.status(200).json({
            errorStatus: false,
            messageStatus: "Categorias listadas com sucesso!",
            categorias: categorias
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
router.put("/categoria/editCategoria/:id", (req, res) => {
    categoriaModel.update({//MÉTODO PARA ATUALIZAR OS DADOS DO MODELO DE DADOS
        //DADOS A SEREM ALTERADOS 
        nome_categoria: req.body.nome_categoria,
        observacoes_categoria: req.body.observacoes_categoria
    },
        {//CONDIÇÃO QUE ESPECIFÍCA QUE A CATEGORIA A SER ALTERADO É ESPECIFICADO PELO REQUISITO "id"
            where: {
                codigo_categoria: req.params.id,
            },
        } 
    )
    .then((categoriaModel) => {
        //CONDIÇÃO QUE RETORNA UM ERRO CASO O CÓDIGO NÃO EXISTA NO BANCO DE DADOS
        if (!categoriaModel){
        return res.status(404).json({
            errorStatus: true,
            messageStatus: "Categoria não encontrada!",
        });
    };
    })
    .then(() =>{ 
        //RETORNO CASO AS CATEGORIAS TENHAM SIDO ALTERADAS
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Categorias atualizadas com sucesso!",
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

//ROTA PARA EXCLUSÃO DE CATEGORIAS
router.delete("/categoria/deleteCategoria/:id", (req, res) => {
    categoriaModel.destroy({//MÉTODO PARA EXCLUSÃO DE CATEGORIAS
        where: {//CONDIÇÃO QUE ESPECIFÍCA QUE A CATEGORIA A SER EXCLUÍDA É ESPECIFICADA PELO REQUISITO "id"
            codigo_categoria: req.params.id
        },
    })
    .then((categoriaModel) => {
        //CONDIÇÃO QUE RETORNA UM ERRO CASO O CÓDIGO NÃO EXISTA NO BANCO DE DADOS
        if (!categoriaModel){
            return res.status(404).json({
                errorStatus: true,
                messageStatus: "Categoria não encontrada!"
            });
        };
    })
    .then(() => {
        //RETORNO CASO O PRODUTO TENHA SIDO DELETADO
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Categoria deletada com sucesso",
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