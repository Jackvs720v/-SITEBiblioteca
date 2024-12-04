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
              <p class="book-pages">Páginas: {{ book.pages || 'N/A' }}</p>
              <p class="book-isbn">ISBN: {{ book.isbn }}</p>
              <p class="book-copies">Cópias: {{ book.copies || 'N/A' }}</p>
              <p class="book-available">Cópias disponíveis: {{ book.available || 'N/A' }}</p>
              <p class="book-synopsis">{{ book.synopsis || 'Sinopse não disponível.' }}</p>
              <p class="book-publication">Publicação: {{ book.year || 'N/A' }}</p>
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
    </div>
  </div>
</template>

<script>
import Navbar from "../components/NavBarAdm.vue";
import axios from "axios";

export default {
  name: "DetalhesBook",
  components: {
    Navbar,
  },
  data() {
    return {
      book: null, // Dados do livro
    };
  },
  methods: {
    async fetchBook() {
      const bookId = this.$route.params.id; // Captura o ID do livro da URL
      try {
        const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
        this.book = response.data; // Carrega os detalhes do livro
      } catch (error) {
        console.error("Erro ao carregar o livro:", error.response?.data || error.message);
      }
    },
    async reserveBook() {
      const userId = localStorage.getItem("userId"); // Captura o ID do usuário logado
      console.log(userId);  // Verifique se está retornando o ID correto

      if (!userId) {
        console.error("Usuário não está logado.");
        return;
      }
      try {
        await axios.post(`http://localhost:3000/api/reserve`, {
          userId,
          bookId: this.book.id,
        });
        alert("Livro reservado com sucesso!");
      } catch (error) {
        console.error("Erro ao reservar o livro:", error.response?.data || error.message);
        alert("Falha ao reservar o livro.");
      }
    },
    saveBook() {
      console.log(`Salvando o livro: ${this.book.title}`);
      // Adicionar lógica para salvar o livro aqui
    },
  },
  mounted() {
    this.fetchBook(); // Carrega os dados do livro ao montar o componente
  },
};
</script>


<style scoped>
/* Estilização permanece igual ou pode ser ajustada para exibir detalhes do livro */
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
</style>
