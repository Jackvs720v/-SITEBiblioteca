<template>
  <div id="detalhesBook">
    <!-- Navbar -->
    <NavBar />

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
            <CardMain v-for="book in filteredBooks" :key="book._id" :book="book" />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import CardMain from "../components/cardMain.vue";
import NavBar from "../components/NavBarAdm.vue";
import api from "../services/api"; // Importação da API

export default {
  components: {
    CardMain,
    NavBar,
  },
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
      books: [], // Inicializado vazio
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
    fetchBooks() {
      api
        .getBooks() // Chama a API para buscar livros
        .then((response) => {
          this.books = response.data; // Atualiza a lista de livros
        })
        .catch((error) => {
          console.error("Erro ao buscar livros:", error);
        });
    },
    onSearch() {
      console.log("Busca: ", this.searchQuery);
    },
    gotoDashBoard() {
      this.$router.push("/dashboard");
    },
    gotoAppBook() {
      this.$router.push("/appbook");
    },
  },
  mounted() {
    this.fetchBooks(); // Busca os livros ao carregar o componente
  },
};
</script>

<style>
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
</style>
