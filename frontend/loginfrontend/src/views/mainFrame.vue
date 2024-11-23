<template>
    <div id="dashboard">
      <!-- Sidebar -->
      <div class="sidebar">
        <h2>DownBook</h2>
        <ul>
          <li v-for="(item, index) in sidebarItems" :key="index">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
  
      <!-- Main Content -->
      <div class="main-content">
        <!-- Navbar -->
        <div class="header">
          <h1>DownBook</h1>
          <div class="icons">
            <i class="fas fa-search"></i>
            <i class="fas fa-filter"></i>
            <i class="fas fa-book"></i>
            <i class="fas fa-bell"></i>
            <!-- Local para imagem -->
            <div class="profile">
              <img src="perfil-placeholder.png" alt="Imagem do Perfil" />
            </div>
          </div>
        </div>
  
        <div class="content">
          <!-- Destaques da Semana -->
          <h2 class="section-title">Destaques da Semana</h2>
          <div class="books-grid">
            <div class="book-card" v-for="(book, index) in featuredBooks" :key="index">
              <img :src="book.cover" alt="Capa do Livro" />
              <h3>{{ book.title }}</h3>
              <p>Autor: {{ book.author }}</p>
              <p>Comentários: {{ book.comments }}</p>
              <p>Avaliação: ⭐⭐⭐⭐⭐</p>
            </div>
          </div>
  
          <!-- Home Sweet Home -->
          <h2 class="section-title">Home Sweet Home :)</h2>
          <div class="books-grid">
            <div class="book-card" v-for="(book, index) in homeBooks" :key="index">
              <img :src="book.cover" alt="Capa do Livro" />
              <h3>{{ book.title }}</h3>
              <p>Autor: {{ book.author }}</p>
              <p>Comentários: {{ book.comments }}</p>
              <p v-if="book.price">Preço: {{ book.price }}</p>
              <p>Avaliação: ⭐⭐⭐⭐☆</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        sidebarItems: [
          { name: "Arte", icon: "fas fa-paint-brush" },
          { name: "Autoajuda", icon: "fas fa-heart" },
          { name: "Biografias", icon: "fas fa-user" },
          { name: "Ciências", icon: "fas fa-flask" },
          { name: "Gastronomia", icon: "fas fa-utensils" },
          { name: "Ficção", icon: "fas fa-book" },
          { name: "HQs", icon: "fas fa-book-open" },
          { name: "Mangás", icon: "fas fa-book-reader" },
          { name: "Cultura Clássica", icon: "fas fa-landmark" },
          { name: "Cultura Brasileira", icon: "fas fa-flag" },
          { name: "Textos Científicos", icon: "fas fa-atom" },
          { name: "Ficções Reais", icon: "fas fa-feather-alt" },
          { name: "Fotografia", icon: "fas fa-camera" },
        ],
        featuredBooks: [
          { cover: "livro1.png", title: "Vida Fora da Gangue", author: "Pedro Stiehl", comments: 50 },
          { cover: "livro2.png", title: "O Menino que Descobriu o Vento", author: "William Kamkwamba", comments: 70 },
          { cover: "livro3.png", title: "Manual de Persuasão do FBI", author: "Jack Shafer", comments: 60 },
        ],
        homeBooks: [
          { cover: "livro4.png", title: "Dom Quixote", author: "Miguel Cervantes", comments: 123 },
          { cover: "livro5.png", title: "Noites Brancas", author: "Dostoiévski", comments: 80 },
          { cover: "livro6.png", title: "Como convencer alguém em 90 segundos", author: "Nicholas Boothman", price: "R$29,90", comments: 95 },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  #dashboard {
    display: flex;
    background-color: #d1e7ff;
    font-family: "Arial", sans-serif;
  }
  
  /* Sidebar */
  .sidebar {
    width: 200px;
    background-color: #4c84e5;
    color: white;
    padding: 20px;
  }
  
  .sidebar h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    cursor: pointer;
  }
  
  .sidebar ul li i {
    margin-right: 10px;
  }
  
  .sidebar ul li span {
    font-size: 14px;
  }
  
  /* Main Content */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  /* Navbar */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #4c84e5;
    color: white;
  }
  
  .icons {
    display: flex;
    align-items: center;
  }
  
  .icons i {
    margin-left: 15px;
    cursor: pointer;
  }
  
  .profile img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 15px;
    border: 2px solid white;
  }
  
  /* Content */
  .content {
    padding: 20px;
  }
  
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
  }
  
  .book-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .book-card img {
    max-width: 100%;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .book-card h3 {
    font-size: 1rem;
    margin: 5px 0;
  }
  
  .book-card p {
    margin: 5px 0;
  }
  </style>
  