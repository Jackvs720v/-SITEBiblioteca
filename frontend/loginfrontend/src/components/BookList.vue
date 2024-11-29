<template>
    <div class="book-list-container">
    <!--Lista de livros-->
        <ul class="book-list">  
            <li v-for="book in books" :key="book._id" class="book-item" >
                <!-- Exibe a imagem da capa do livro -->
            <img :src="book.image ? `http://localhost:3000${book.image}` : ''" alt="Capa do livro" v-if="book.image" />
                

                <!-- Exibe o título, autor, ano, ISBN e editora -->
            <div class="book-info">
                <span class="book-title">Título: {{ book.title }}</span>
                <span class="book-author">Autor: {{ book.author }}</span>
                <span class="book-year">Ano de lançamento: ({{ book.year }})</span>
                <span class="book-isbn">ISBN: {{ book.isbn }}</span>
                <span class="book-publisher">Editora: {{ book.editora }}</span>
            </div>

                <button @click="editBook(book)" class="edit-button">Editar</button>
                <button @click="deleteBook(book._id)" class="delete-button">Excluir</button>
            </li>
        </ul>
    </div >
</template>
<script>
import api from '../services/api'; 

export default {
    data() {
        return {
            books: []
        }; //Estado Local da lista de livros 
    },
    methods: {
        fetchBooks(){//Busca os livros do back-end
            api.getBooks().then(response =>{
                this.books = response.data; //Atualiza a lista de livros 
            });
        },
        deleteBook(id){//Exclui um livro pelo ID
            api.deleteBook(id).then(() =>{
                this.fetchBooks(); //Atualiza a lista após a exclusão
            });
    },
    editBook(book){ //Emite um evento para editar um livro
        this.$emit('edit-book',book); //Emite o evento 'edit-book'
        console.log('Editando livro:', book); // Log para verificar se a função está sendo chamada corretamente
    },
},
mounted() {
    this.fetchBooks(); //Busca os livros ao montar o componente
},
};
</script>
<style>
/* Define a aparência geral do container */
.book-info {
    background-color: #f9f9f9; /* Fundo claro e suave */
    border-radius: 10px; /* Bordas arredondadas para um toque moderno */
    padding: 20px; /* Espaçamento interno */
    max-width: 500px; /* Largura máxima para evitar que o conteúdo se estenda demais */
    margin: 20px auto; /* Centraliza o container na tela */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para dar destaque */
    font-family: 'Arial', sans-serif; /* Define uma fonte legível */
}

/* Define o estilo de cada item de informação */
.book-info span {
    display: block; /* Faz com que cada item ocupe uma linha */
    margin-bottom: 10px; /* Espaçamento entre os itens */
    font-size: 16px; /* Tamanho da fonte */
    color: #333; /* Cor de texto escuro */
}

/* Estilo para o título */
.book-title {
    font-size: 18px; /* Tamanho maior para o título */
    font-weight: bold; /* Deixa o título em negrito */
    color: #2a7ae2; /* Cor azul para destaque */
}

/* Estilo para o autor */
.book-author {
    font-style: italic; /* Texto em itálico para o autor */
    color: #555; /* Cor mais suave para o autor */
}

/* Estilo para o ano */
.book-year {
    color: #777; /* Cor mais suave para o ano */
}

/* Estilo para o ISBN */
.book-isbn {
    font-family: 'Courier New', Courier, monospace; /* Fonte monoespaçada para o ISBN */
    color: #444; /* Cor escura */
}

/* Estilo para a editora */
.book-publisher {
    font-weight: bold; /* Em negrito para a editora */
    color: #9b59b6; /* Cor roxa suave para a editora */
}
</style>