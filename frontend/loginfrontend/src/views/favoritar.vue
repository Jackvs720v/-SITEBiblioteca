<template>
    <div>
      <!-- Navbar -->
      <NavBarAdm />
  
      <!-- Favorites Container -->
      <div class="favorites-container">
        <h2>Favoritos</h2>
        <ul class="book-list">
          <li 
            class="book-item" 
            v-for="book in books" 
            :key="book.id"
          >
            <div class="book-details">
              <h4>{{ book.title }}</h4>
              <p>{{ book.author }}</p>
            </div>
            <button 
              class="favorite-button" 
              :class="{'favorited': book.favorited}" 
              @click="toggleFavorite(book.id)"
            >
              {{ book.favorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import NavBarAdm from "@/components/NavBarAdm.vue";
  
  export default {
    name: "Favorites",
    components: {
      NavBarAdm,
    },
    data() {
      return {
        books: [
          { id: 1, title: "Clean Code", author: "Robert C. Martin", favorited: false },
          { id: 2, title: "O Poder do Hábito", author: "Charles Duhigg", favorited: true },
          { id: 3, title: "JavaScript: The Good Parts", author: "Douglas Crockford", favorited: false },
        ],
      };
    },
    methods: {
      toggleFavorite(id) {
        const book = this.books.find((b) => b.id === id);
        if (book) book.favorited = !book.favorited;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Favorites Page Styles */
  .favorites-container {
    margin: 20px auto;
    width: 90%;
    max-width: 600px;
    text-align: center;
    font-family: 'Poppins', Arial, sans-serif;
    background-color: #e0f7fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .favorites-container h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #34495e;
  }
  
  .book-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .book-item {
    background-color: #ecf0f1;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .book-item:hover {
    background-color: #d5dde1;
  }
  
  .book-details {
    text-align: left;
  }
  
  .book-details h4 {
    margin: 0;
    font-size: 18px;
    color: #2c3e50;
  }
  
  .book-details p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #7f8c8d;
  }
  
  .favorite-button {
    padding: 8px 12px;
    background-color: #3498db; /* Blue for action */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
  }
  
  .favorite-button.favorited {
    background-color: #e74c3c; /* Red for favorited */
  }
  
  .favorite-button:hover {
    background-color: #2980b9; /* Darker blue on hover */
  }
  
  .favorite-button.favorited:hover {
    background-color: #c0392b; /* Darker red on hover */
  }
  </style>
  