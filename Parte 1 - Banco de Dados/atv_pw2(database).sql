/* CRIACÃO DO BANCO DE DADOS */
CREATE DATABASE atv_pw2;

/* SELECÃO DO BANCO DE DADOS */
USE atv_pw2;

/* CRIAÇÃO DA TABELA PRODUTOS */
CREATE TABLE tbl_produtos (
	codigo_produto INT UNSIGNED KEY AUTO_INCREMENT,
    codigo_categoria INT UNSIGNED,
	nome_produto VARCHAR(255) NOT NULL,
    valor_produto DECIMAL(10, 2) NOT NULL,
    imagem_produto VARCHAR(500) NOT NULL,
    descricao_produto TEXT NOT NULL
);
/* CRIAÇÃO DA TABELA CATEGORIAS */
CREATE TABLE tbl_categorias (
	codigo_categoria INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(255) NOT NULL,
    observacoes_categoria TEXT NOT NULL
);