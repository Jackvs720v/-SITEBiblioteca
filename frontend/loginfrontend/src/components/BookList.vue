<template>
    <div class="book-list-container">
      <!-- Lista de livros -->
      <ul class="book-list">
        <li v-for="book in books" :key="book._id" class="book-item">
          <!-- Exibe a imagem da capa do livro -->
          <img
            :src="book.image ? `http://localhost:3000${book.image}` : 'default-cover.jpg'"
            alt="Capa do livro"
            class="book-cover"
          />
  
          <!-- Informações do livro -->
          <div class="book-info">
            <span class="book-title">Título: {{ book.title }}</span>
            <span class="book-author">Autor: {{ book.author }}</span>
            <span class="book-year">Ano de lançamento: ({{ book.year }})</span>
            <span class="book-isbn">ISBN: {{ book.isbn }}</span>
            <span class="book-publisher">Editora: {{ book.editora }}</span>
            <span class="book-quantity">Quantidade: {{ book.quantidade }}</span>
            <span class="book-synopsis">Sinopse: {{ book.sinopse }}</span>
          </div>
  
          <!-- Botões de ação -->
          <div class="action-buttons">
            <button @click="editBook(book)" class="edit-button">Editar</button>
            <button @click="deleteBook(book._id)" class="delete-button">Excluir</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from "../services/api";
  
  export default {
    data() {
      return {
        books: [],
      };
    },
    methods: {
      fetchBooks() {
        api
          .getBooks()
          .then((response) => {
            this.books = response.data;
          })
          .catch((error) => {
            console.error("Erro ao buscar os livros:", error.message);
          });
      },
      deleteBook(id) {
        if (confirm("Você tem certeza que deseja excluir este livro?")) {
          api
            .deleteBook(id)
            .then(() => {
              alert("Livro excluído com sucesso!");
              this.fetchBooks();
            })
            .catch((error) => {
              console.error("Erro ao excluir o livro:", error.message);
            });
        }
      },
      editBook(book) {
        this.$emit("edit-book", book);
        console.log("Editando livro:", book);
      },
    },
    mounted() {
      this.fetchBooks();
    },
  };
  </script>
  
  <style scoped>
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
  
  /* Estilo para a quantidade */
  .book-quantity {
    color: #d35400; /* Cor laranja suave */
  }
  
  /* Estilo para a sinopse */
  .book-synopsis {
    color: #2c3e50; /* Cor azul escuro */
  }
  </style>
  