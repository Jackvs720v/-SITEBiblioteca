<template>
    <div id="principal">
      <header class="header">
        <h1>Minha Biblioteca</h1>
        <button @click="logout">Sair</button>
      </header>
  
      <main>
        <section class="book-section">
          <h2>Destaques da Semana</h2>
          <div class="book-grid">
            <div v-for="book in destaqueSemana" :key="book.id" class="book-card">
              <img :src="book.image" :alt="book.title" class="book-cover" />
              <h3>{{ book.title }}</h3>
              <p>{{ book.author }}</p>
              <p class="rating">⭐ {{ book.rating }}</p>
            </div>
          </div>
        </section>
  
        <section class="book-section">
          <h2>Novos na Loja</h2>
          <div class="book-grid">
            <div v-for="book in novosNaLoja" :key="book.id" class="book-card">
              <img :src="book.image" :alt="book.title" class="book-cover" />
              <h3>{{ book.title }}</h3>
              <p>{{ book.author }}</p>
              <p class="rating">⭐ {{ book.rating }}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        destaqueSemana: [
          { id: 1, image: "book1.jpg", title: "Livro 1", author: "Autor 1", rating: 4.5 },
          { id: 2, image: "book2.jpg", title: "Livro 2", author: "Autor 2", rating: 4.0 },
          { id: 3, image: "book3.jpg", title: "Livro 3", author: "Autor 3", rating: 4.8 },
          { id: 4, image: "book4.jpg", title: "Livro 4", author: "Autor 4", rating: 4.7 },
        ],
        novosNaLoja: [
          { id: 5, image: "book5.jpg", title: "Livro 5", author: "Autor 5", rating: 4.9 },
          { id: 6, image: "book6.jpg", title: "Livro 6", author: "Autor 6", rating: 4.3 },
          { id: 7, image: "book7.jpg", title: "Livro 7", author: "Autor 7", rating: 4.6 },
          { id: 8, image: "book8.jpg", title: "Livro 8", author: "Autor 8", rating: 4.4 },
        ],
      };
    },
    methods: {
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  #principal {
    font-family: 'Arial', sans-serif;
    background-color: #f9f9f9;
    color: #333;
    padding: 20px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    padding: 10px 20px;
    color: white;
    border-radius: 8px;
  }
  
  .header h1 {
    font-size: 24px;
  }
  
  .header button {
    padding: 10px 15px;
    background-color: #dc3545;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }
  
  .header button:hover {
    background-color: #c82333;
  }
  
  .book-section {
    margin: 20px 0;
  }
  
  .book-section h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }
  
  .book-card {
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .book-cover {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  .book-card h3 {
    font-size: 16px;
    margin: 10px 0 5px;
  }
  
  .book-card p {
    margin: 0;
    font-size: 14px;
    color: #555;
  }
  
  .rating {
    margin-top: 5px;
    color: #f39c12;
    font-weight: bold;
  }
  </style>
  