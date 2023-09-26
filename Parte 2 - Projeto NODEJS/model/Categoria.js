//IMPORTANDO MÓDULO SEQUELIZE
const sequelize = require("sequelize");

//CRIANDO UMA CONEXÃO COM O BANCO DE DADOS
const connection = require("../database/database");

//DEFININDO A CONEXÃO E INSERINDO TABELAS
const Categoria = connection.define(
    "tbl_categorias",
    {
        codigo_categoria:{
            type: sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unsigned: true
        },
        nome_categoria:{
            type: sequelize.STRING(255),
            allowNull: false
        },
        observacoes_categoria:{
            type: sequelize.TEXT,
            allowNull: false
        }
    }
);

//SICRONIZAÇÃO COM O BANCO DE DADOS
Categoria.sync({force:false});

//EXPORTANDO AS TABELAS DO BANCO DE DADOS
module.exports = Categoria;