const sequelize = require("sequelize");
const connection = require("../database/database");

const Produto = connection.define(
    'tbl_produtos',
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

Produto.sync({force:true});

module.exports = Produto;