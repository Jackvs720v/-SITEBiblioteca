<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-left">
        <img src="@/assets/logo.png" alt="Logo" class="navbar-logo" />

      </div>
      <div class="navbar-center">
        <div class="search-container">
          <img src="@/assets/loupe.png" alt="Buscar" class="search-icon" />
          <input
            type="text"
            class="navbar-search"
            placeholder="Pesquisar livros..."
            v-model="searchQuery"
            @input="onSearch"
          />
          <img src="@/assets/filter.png" alt="Filtrar" class="search-icon" />
        </div>
        <img src="@/assets/users.png" alt="Users" class="icon right-icon" />
      </div>
      <div class="navbar-right">
       <a href=""> <img src="@/assets/crud.png" alt="Crud" class="icon"/></a>
       <a href=""> <img src="@/assets/dashboard.png" alt="DashBoard" class="icon" @click="gotoDashBoard()"/></a>
       <a href=""> <img src="@/assets/salvar.png" alt="Salvar" class="icon" /></a>
       <a href=""> <img src="@/assets/notificacao.png" alt="Notificação" class="icon" /></a>
       <a href=""> <img src="@/assets/perfil.png" alt="Perfil" class="icon" /></a>
      </div>
    </nav>

    <!-- Main Layout -->
    <div class="layout">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h2 class="sidebar-title">Categorias</h2>
        <ul class="sidebar-list">
          <li v-for="item in categories" :key="item" class="sidebar-item">
            <a href="#" class="sidebar-link">{{ item }}</a>
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <section class="section">
          <h2 class="section-title">Destaques da Semana</h2>
          <div class="book-grid">
            <div v-for="book in filteredBooks" :key="book.id" class="book-card">
              <img :src="book.cover" :alt="book.title" class="book-cover" />
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">Autor: {{ book.author }}</p>
              <p class="book-rating">Avaliação: {{ book.rating }}</p>
              <p class="book-year">Ano: {{ book.year }}</p>
              <button class="book-button">Ver mais</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      categories: [
        "Destaques",
        "Ano",
        "Autores",
        "Gêneros",
        "Favoritos",
        "História",
        "Fantasia",
        "Ciência",
        "Biografias",
        "Romance",
        "Suspense",
        "Terror",
        "Ficção Científica",
      ],
      books: [
        { id: 1, title: "Livro A", author: "Autor A", rating: "⭐⭐⭐⭐", year: 2022, cover: "cover1.jpg" },
        { id: 2, title: "Livro B", author: "Autor B", rating: "⭐⭐⭐⭐⭐", year: 2021, cover: "cover2.jpg" },
        { id: 3, title: "Livro C", author: "Autor C", rating: "⭐⭐⭐", year: 2020, cover: "cover3.jpg" },
        { id: 4, title: "Livro D", author: "Autor D", rating: "⭐⭐⭐⭐", year: 2021, cover: "cover4.jpg" },
      ],
    };
  },
  computed: {
    filteredBooks() {
      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    onSearch() {
      console.log("Busca: ", this.searchQuery);
    },
    gotoDashBoard(){
      this.$router.push("/dashboard")
    },
  },
};
</script>

<style>
/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #bcd7e5;
  padding: 15px 30px;
  border-bottom: 2px solid #007bff;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-logo {
  height: 80px;
  margin-right: 10px;
}

.navbar-title {
  font-size: 2em;
  font-weight: bold;
  color: #007bff;
}

.navbar-center {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 5px 15px;
  width: 600px;
}

.navbar-search {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.2em;
  padding: 8px;
}

.search-icon {
  width: 30px;
  height: 30px;
  margin: 0 10px;
}

.icon.right-icon {
  margin-left: 20px;
  width: 5%;
  height: 5%;
}

.navbar-right .icon {
  width: 50px;
  height: 50px;
  color: #007bff;
  margin-left: 15px;
  cursor: pointer;
  transition: color 0.3s;
}

.navbar-right .icon:hover {
  color: #0056b3;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  border-right: 2px solid #ddd;
  padding: 20px;
}

.sidebar-title {
  font-size: 1.5em;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 15px;
}

.sidebar-list {
  list-style: none;
  padding: 0;
}

.sidebar-item {
  margin-bottom: 10px;
}

.sidebar-link {
  text-decoration: none;
  color: #333;
  font-size: 1.1em;
}

.sidebar-link:hover {
  color: #007bff;
}

/* Main Content Styles */
.layout {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
}

.section-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 20px;
}

.book-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

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
.book-rating,
.book-year {
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
