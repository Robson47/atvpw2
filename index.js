//IMPORTANDO O MÓDULO EXPRESS
const express = require("express");

//INSTÃNCIANDO O MÓDULO EXPRESS
const app = express();

//PREPARANDO O EXPRESS PARA MANIPULAR JSON
app.use(express.json());

//TESTE DE CONEXÃO  
const connection = require("./database/database");
console.log(connection);

//CONFIGURANDO O EXPRESS PARA TRABALHAR COM DADOS DE FORMULÁRIO
app.use(express.urlencoded({extended:true}));

//IMPORTANDO A CONTROLLER DE CATEGORIA
const categoriaController = require("./controller/CategoriaController");
app.use("/", categoriaController);

//IMPORTANDO A CONTROLLER DE PRODUTO
const produtoController = require("./controller/ProdutoController");
app.use("/", produtoController);

//CONFIRMAÇÃO DO SERVIDOR ONLINE (REQUISIÇÕES E RESPOSTAS)
app.listen(3000, ()=>{
    console.log("O SERVIDOR ESTÁ ONLINE EM: http://localhost:3000");
});