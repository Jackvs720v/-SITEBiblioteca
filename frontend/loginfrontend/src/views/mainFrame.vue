<template>
  <div id="app">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-logo">Minha Biblioteca</div>
      <input 
        type="text" 
        class="nav-search" 
        placeholder="Pesquisar livros..." 
        v-model="searchQuery" 
        @input="searchBooks" 
      />
      <div class="nav-icons">
        <i class="icon fas fa-home"></i>
        <i class="icon fas fa-book"></i>
        <i class="icon fas fa-user"></i>
      </div>
    </nav>

    <div class="main-content">
      <!-- Sidebar -->
      <aside class="sidebar">
        <h3>Filtros</h3>
        <label v-for="filter in filters" :key="filter.value">
          <input 
            type="checkbox" 
            :value="filter.value" 
            v-model="selectedFilters" 
            @change="applyFilters" 
          />
          {{ filter.label }}
        </label>
      </aside>

      <!-- Book List -->
      <div class="book-container">
        <div 
          class="book-card" 
          v-for="book in filteredBooks" 
          :key="book.id"
        >
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">Autor: {{ book.author }}</p>
          <p class="book-rating">Avaliação: {{ book.rating }}</p>
          <p class="book-year">Ano: {{ book.year }}</p>
          <button class="book-button">Ver mais</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [
        { id: 1, title: "Livro A", author: "Autor A", rating: "⭐⭐⭐⭐", year: 2022 },
        { id: 2, title: "Livro B", author: "Autor B", rating: "⭐⭐⭐⭐⭐", year: 2021 },
        { id: 3, title: "Livro C", author: "Autor C", rating: "⭐⭐⭐", year: 2022 }
      ],
      searchQuery: "",
      selectedFilters: [],
      filters: [
        { label: "Ano: 2022", value: "2022" },
        { label: "Ano: 2021", value: "2021" },
        { label: "Avaliação: ⭐⭐⭐⭐⭐", value: "5-stars" }
      ]
    };
  },
  computed: {
    filteredBooks() {
      let filtered = this.books;

      if (this.searchQuery) {
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.selectedFilters.length) {
        filtered = filtered.filter(book => {
          return (
            this.selectedFilters.includes(book.year.toString()) ||
            (this.selectedFilters.includes("5-stars") && book.rating === "⭐⭐⭐⭐⭐")
          );
        });
      }

      return filtered;
    }
  },
  methods: {
    searchBooks() {
      // Apenas necessário para capturar input de busca no momento em tempo real.
    },
    applyFilters() {
      // Filtragem já é gerenciada pela computed property `filteredBooks`.
    }
  }
};
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
}

.nav-logo {
  font-size: 1.5em;
  font-weight: bold;
}

.nav-search {
  flex: 1;
  margin: 0 20px;
  padding: 5px 10px;
  font-size: 1em;
  border-radius: 4px;
  border: none;
}

.nav-icons .icon {
  font-size: 1.5em;
  margin: 0 10px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.nav-icons .icon:hover {
  color: #ddd;
}

/* Sidebar Styles */
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
}

.sidebar h3 {
  font-size: 1.2em;
  margin-bottom: 15px;
}

.sidebar label {
  display: block;
  margin-bottom: 10px;
  font-size: 1em;
  color: #333;
}

.sidebar input {
  margin-right: 5px;
}

/* Book List Styles */
.book-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  background-color: #f9f9f9;
  flex-grow: 1;
}

.book-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  text-align: left;
}

.book-title {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 10px;
}

.book-author, .book-rating, .book-year {
  font-size: 1em;
  color: #666;
  margin: 5px 0;
}

.book-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.book-button:hover {
  background-color: #0056b3;
}

/* Main Layout Styles */
#app {
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

.main-content {
  display: flex;
  flex: 1;
}
</style>
