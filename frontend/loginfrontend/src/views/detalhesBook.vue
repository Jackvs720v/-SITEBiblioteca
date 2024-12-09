<template>
  <div id="detalhesBook">
    <!-- Navbar -->
    <Navbar />
    <!-- Main Content - Detalhes do Livro -->
    <div class="layout">
      <div v-if="book" class="book-container">
        <div class="book-card">
          <div class="book-header">
            <img
              :src="book.image ? `http://localhost:3000${book.image}` : 'default-cover.jpg'"
              alt="Capa do livro"
              class="book-cover"
            />
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">Autor: {{ book.author }}</p>
              <p class="book-pages">Páginas: {{ book.paginas || 'N/A' }}</p>
              <p class="book-isbn">ISBN: {{ book.isbn }}</p>
              <p class="book-copies">Cópias Disponíveis: {{ book.quantidade || 'N/A' }}</p>
              <p class="book-copies">
                Cópias Alugadas: {{ book.copia - book.quantidade || 'N/A' }}
              </p>
              <p class="book-synopsis">{{ book.sinopse || 'Sinopse não disponível.' }}</p>
              <p class="book-publication">Ano de publicação: {{ book.year || 'N/A' }}</p>
              <p class="book-publisher">Editora: {{ book.editora || 'N/A' }}</p>
            </div>
          </div>
          <div class="book-footer">
            <div class="book-rating">Avaliação: {{ book.rating || 'N/A' }}</div>
            <div class="book-comments" v-if="book.comments && book.comments.length">
              <p>Comentários ({{ book.comments.length }})</p>
              <ul>
                <li v-for="(comment, index) in book.comments" :key="index">
                  <strong>{{ comment.user }}:</strong> {{ comment.text }}
                </li>
              </ul>
            </div>
            <button @click="reserveBook()">Reservar</button>
            <button @click="saveBook()">Salvar</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Carregando os detalhes do livro...</p>
      </div>
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/NavBarAdm.vue";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "DetalhesBook",
  components: {
    Navbar,
  },
  data() {
    return {
      book: null,
      errorMessage: "",
    };
  },
  methods: {
    async fetchBook() {
      const bookId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/books/${bookId}`);
        this.book = response.data;
        this.errorMessage = "";
      } catch (error) {
        console.error("Erro ao carregar o livro:", error.response?.data || error.message);
        this.book = null;
        this.errorMessage = "Erro ao carregar os detalhes do livro. Tente novamente mais tarde.";
      }
    },
    async reserveBook() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado para reservar um livro.");
        this.$router.push("/login");
        return;
      }

      try {
        const response = await axios.post(
          "/api/books/reservar",
          { bookId: this.book._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert(response.data.message);
        await this.fetchBook();
      } catch (error) {
        console.error("Erro ao reservar o livro:", error.response?.data || error.message);
        this.errorMessage = error.response?.data?.error || "Erro ao reservar o livro.";
      }
    },
    async saveBook() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado para salvar um livro.");
        this.$router.push("/login");
        return;
      }

      try {
        await axios.post(
          "/api/save",
          { bookId: this.book._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Livro salvo com sucesso!");
      } catch (error) {
        console.error("Erro ao salvar livro:", error.response?.data || error.message);
        alert("Falha ao salvar o livro.");
      }
    },
  },
  mounted() {
    this.fetchBook();
  },
};
</script>

<style scoped>
#detalhesBook {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.book-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.book-header {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}

.book-cover {
  width: 150px;
  height: 200px;
  margin-right: 20px;
}

.book-info {
  flex: 1;
}

.book-title {
  font-size: 2em;
  font-weight: bold;
}

.book-author,
.book-isbn,
.book-synopsis,
.book-publication {
  font-size: 1.2em;
  margin: 10px 0;
}

.book-footer {
  width: 100%;
  max-width: 800px;
  text-align: center;
}

button {
  padding: 10px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .book-header {
    flex-direction: column;
    align-items: center;
  }

  .book-cover {
    width: 120px;
    height: 160px;
    margin-right: 0;
    margin-bottom: 10px;
  }

  .book-info {
    text-align: center;
  }
}
</style>
  