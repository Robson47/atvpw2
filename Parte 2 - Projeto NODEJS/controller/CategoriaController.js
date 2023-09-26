const express = require("express");
const categoriaModel = require("../model/Categoria");
const router = express.Router();

router.post("/categoria/cadastrarCategoria", (req, res) =>{
    let { nome_categoria, observacoes_categoria } = req.body;

    categoriaModel.create({nome_categoria, observacoes_categoria})
    .then(() => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Categoria foi inserida com êxito"
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});
router.get("/categoria/listarCategoria", (req, res) => {
    categorias = categoriaModel.findAll()
    .then((categorias) => {
        return res.status(200).json({
            errorStatus: false,
            messageStatus: "Categorias listadas com sucesso!",
            categorias: categorias
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});
router.put("/categoria/editCategoria/:id", (req, res) => {
    let { codigo_categoria } = req.params;
    let { nome_categoria, observacoes_categoria } = req.body;
    categoriaModel.update({
        nome_categoria: req.body.nome_categoria,
        observacoes_categoria: req.body.observacoes_categoria
      },
      {
        where: {
          codigo_categoria: req.params.id,
        },
      }
    )
    .then((categoriaModel) => {
        if (!categoriaModel){
        return res.status(404).json({
            errorStatus: true,
            messageStatus: "Categoria não encontrada!",
        });
    };
    })
    .then((categoriaUpdate) =>{ 
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Categorias atualizadas com sucesso!",
            categoriaUp: categoriaUpdate
        });
    })
    .catch((error) => {
        return res.status(500).json({
            errorStatus: true,
            messageStatus: error
        });
    });
});
router.delete("/categoria/deleteCategoria/:id", (req, res) => {
let { codigo_categoria } = req.params;
    categoriaModel.destroy({
        where: {
            codigo_categoria: req.params.id
        },
    })
    .then((categoriaModel) => {
        if (!categoriaModel){
            return res.status(404).json({
                errorStatus: true,
                messageStatus: "Categoria não encontrada!"
            });
        };
    })
    .then((categoriaDeleted) => {
        return res.status(201).json({
            errorStatus: false,
            messageStatus: "Categoria deletada com sucesso",
            categoriaDelete: categoriaDeleted
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