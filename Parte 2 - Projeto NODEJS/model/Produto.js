//IMPORTANDO MÓDULO SEQUELIZE
const sequelize = require("sequelize");

//CRIANDO UMA CONEXÃO COM O BANCO DE DADOS
const connection = require("../database/database");

//DEFININDO A CONEXÃO E INSERINDO TABELAS
const Produto = connection.define(
    "tbl_produtos",
    {
        codigo_produto:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unsigned: true
        },
        codigo_categoria:{
            type: sequelize.INTEGER,
            unsigned: true
        },
        nome_produto:{
            type: sequelize.STRING(255),
            allowNull: false
        },
        valor_produto:{
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        imagem_produto:{
            type: sequelize.STRING(500),
            allowNull: false
        },
        descricao_produto:{
            type: sequelize.TEXT,
            allowNull: false
        }
    }
);

//SICRONIZAÇÃO COM O BANCO DE DADOS
Produto.sync({force:false});

//EXPORTANDO AS TABELAS DO BANCO DE DADOS
module.exports = Produto;