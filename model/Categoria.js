const sequelize = require("sequelize");
const connection = require("../database/database");

const Categoria = connection.define(
    'tbl_categorias',
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

Categoria.sync({force:false});

module.exports = Categoria;