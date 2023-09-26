//IMPORTANDO O MÓDULO DO SEQUELIZE
const sequelize = require("sequelize");

//CONFIGURANDO A CONEXÃO COM O BANCO DE DADOS
const connection = new sequelize(
    "atv_pw2",
    "root",
    "",
    {
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        timezone: "-03:00",
    }
);

//EXPORTANDO A CONEXÃO
module.exports = connection;