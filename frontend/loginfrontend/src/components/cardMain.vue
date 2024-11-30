<template>
    <div class="book-card">
      <img :src="book.image" :alt="book.title" class="book-cover" />
      <h3 class="book-title">{{ book.title }}</h3>
      <p class="book-author">Autor: {{ book.author }}</p>
      <p class="book-year">Ano: {{ book.year }}</p>
      <p class="book-publisher">Editora: {{ book.editora }}</p>
      <button class="book-button" @click="viewDetails">Ver mais</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "CardMain",
    props: {
      book: {
        type: Object,
        required: true,
      },
    },
    methods: {
      viewDetails() {
        console.log(`Detalhes do livro: ${this.book.title}`);
        this.$router.push("/detalhesbook")
      },
      
    },
  };
  </script>
  
  <style scoped>
  .book-card {
    width: 200px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 15px;
  }
  .book-cover {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }
  .book-title {
    font-size: 1.2em;
    color: #333;
    margin-bottom: 10px;
  }
  .book-author,
  .book-year,
  .book-publisher {
    font-size: 0.9em;
    color: #666;
  }
  .book-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .book-button:hover {
    background-color: #0056b3;
  }
  </style>
  