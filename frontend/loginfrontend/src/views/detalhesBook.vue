<template>
  <div id="detalhesBook">
    <!-- Navbar -->
    <Navbar />
    <!-- Main Content - Cartões de livros -->
    <div class="layout">
      <div class="book-container">
        <div class="book-card" v-for="book in filteredBooks" :key="book.id">
          <div class="book-header">
            <img :src="book.cover" alt="Capa do livro" class="book-cover" />
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">Autor: {{ book.author }}</p>
              <p class="book-pages">Páginas: {{ book.pages }}</p>
              <p class="book-isbn">ISBN: {{ book.isbn }}</p>
              <p class="book-copies">Cópias: {{ book.copies }}</p>
              <p class="book-available">Cópias disponíveis: {{ book.available }}</p>
              <p class="book-synopsis">{{ book.synopsis }}</p>
              <p class="book-publication">Publicação: {{ book.publicationYear }}</p>
            </div>
          </div>
          <div class="book-footer">
            <div class="book-rating">Avaliação: {{ book.rating }}</div>
            <div class="book-comments">
              <p>Comentários ({{ book.comments.length }})</p>
              <ul>
                <li v-for="comment in book.comments" :key="comment.id">
                  <strong>{{ comment.user }}:</strong> {{ comment.text }}
                </li>
              </ul>
            </div>
            <button @click="reserveBook(book)">Reservar</button>
            <button @click="saveBook(book)">Salvar</button> <!-- Botão Salvar -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Navbar from "../components/NavBarAdm.vue"; // Importando o componente Navbar

export default {
  data() {
    return {
      searchQuery: "",
      books: [
        {
          id: 1,
          title: "Vida Fora Da Gangue",
          author: "Pedro Stiehl",
          rating: "⭐⭐⭐⭐⭐",
          pages: 130,
          isbn: "8587187449",
          copies: 500,
          available: 498,
          synopsis:
            "Quatro amigos e o jornal da escola investigam a misteriosa inutilização de livros da biblioteca.",
          publicationYear: 2000,
          cover: "@/assets/cover1.jpg",
          comments: [
            { id: 1, user: "Seila1674", text: "É um excelente livro, simplesmente incrível !!!" },
            { id: 2, user: "Cleiton1974", text: "Simplesmente... Cinema" },
          ],
          saved: false, // Adicionando um campo para indicar se o livro foi salvo
        },
        // Adicione mais livros aqui
      ],
    };
  },
  components: {
    Navbar, // Registrando o componente
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
    reserveBook(book) {
      console.log("Reservando o livro: " + book.title);
    },
    saveBook(book) {
      // Alterna o status de "salvar" do livro
      book.saved = !book.saved;
      console.log(book.saved ? "Livro salvo: " + book.title : "Livro removido dos salvos: " + book.title);
    },
  },
};
</script>

<style>
/* Estilos gerais para o layout */
#detalhesBook {
  font-family: 'Arial', sans-serif;
}

/* Cartões de livro */
.layout {
  padding: 20px;
}

.book-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.book-card {
  width: 300px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.book-header {
  display: flex;
}

.book-cover {
  width: 80px;
  height: 120px;
  margin-right: 15px;
}

.book-info {
  flex: 1;
}

.book-title {
  font-size: 1.6em;
  font-weight: bold;
}

.book-author,
.book-pages,
.book-isbn,
.book-copies,
.book-available,
.book-synopsis,
.book-publication {
  font-size: 1em;
  margin: 5px 0;
}

.book-footer {
  margin-top: 15px;
  text-align: center;
}

.book-rating {
  font-size: 1.2em;
}

.book-comments {
  font-size: 1em;
  margin-top: 10px;
}

.book-comments ul {
  list-style: none;
  padding: 0;
}

.book-comments li {
  margin: 5px 0;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
    