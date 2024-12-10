<template>
  <div>
    <NavBarAdm />
    <div id="reservado">
      <div class="layout">
        <h1>Livros Reservados</h1>
        <div v-if="reservations.length" class="book-container">
          <div class="book-card" v-for="reservation in reservations" :key="reservation._id">
            <!-- Exibe a imagem do livro, com uma imagem padrão caso não tenha -->
            <img
              :src="reservation.bookId.image ? `http://localhost:3000/${reservation.bookId.image}` : 'default-cover.jpg'"
              alt="Capa do livro"
              class="book-cover"
            />
            <div class="book-info">
              <!-- Exibe o título, autor, sinopse e data de reserva -->
              <h3 class="book-title">{{ reservation.bookId.title }}</h3>
              <p class="book-author">Autor: {{ reservation.bookId.author }}</p>
              <p class="book-synopsis">{{ reservation.bookId.synopsis }}</p>
              <p class="book-reserved-date">Data de reserva: {{ new Date(reservation.reservedAt).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Você não possui livros reservados.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBarAdm from '../components/NavBarAdm.vue';

export default {
  components: {
    NavBarAdm,
  },
  data() {
    return {
      reservations: [],  // Lista de reservas
    };
  },
  created() {
    this.fetchReservations(); // Busca as reservas ao carregar o componente
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/reservas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Usa o token armazenado
          },
        });

        this.reservations = response.data.reservations; // Salva as reservas recebidas
      } catch (error) {
        console.error('Erro ao carregar as reservas:', error);
        alert('Erro ao carregar as reservas.');
      }
    },
  },
};
</script>

<style scoped>
#reservado {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.layout {
  max-width: 1200px;
  margin: 0 auto;
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
  align-items: center;
}

.book-cover {
  width: 120px;
  height: 180px;
  margin-bottom: 15px;
}

.book-info {
  text-align: center;
}

.book-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.book-author,
.book-synopsis,
.book-reserved-date {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}
</style>
