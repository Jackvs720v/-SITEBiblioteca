<template>
   <NavBarAdm />

  <div id="reservado">
    <div class="layout">
      <h1>Livros Reservados</h1>
      <div v-if="reservadoBooks.length" class="book-container">
        <div class="book-card" v-for="book in reservadoBooks" :key="book.id">
          <img
            :src="book.image ? `http://localhost:3000${book.image}` : 'default-cover.jpg'"
            alt="Capa do livro"
            class="book-cover"
          />
          <div class="book-info">
            <h3 class="book-title">{{ book.title }}</h3>
            <p class="book-author">Autor: {{ book.author }}</p>
            <p class="book-synopsis">{{ book.synopsis }}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Você não possui livros reservados.</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarAdm from '@/components/NavBarAdm.vue';

export default {
  components:{
  NavBarAdm,
},
  data() {
    return {
      user: null,
      reservadoBooks: [],  // Lista de livros reservados
      message: ''
    };
  },
  methods: {
    // Função para buscar os dados do usuário
    async fetchUserData() {
      const token = localStorage.getItem('token');
      
      if (!token) {
        this.message = "Você precisa estar logado para acessar os dados do perfil!";
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/auth/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`  // Passando o token no cabeçalho
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }

        const data = await response.json();
        this.user = data;  // Dados do usuário
        this.fetchReservados(); // Após obter os dados do usuário, buscar os livros reservados
      } catch (error) {
        this.message = "Erro ao buscar os dados do usuário.";
        console.error(error);
      }
    },

    // Função para buscar os livros reservados
    async fetchReservados() {
      const token = localStorage.getItem('token');
      
      if (!token) {
        this.message = "Você precisa estar logado para ver os livros reservados!";
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/reservados', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`  // Passando o token de autenticação no cabeçalho
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar livros reservados');
        }

        const data = await response.json();
        
        // Verifique se a resposta tem dados
        if (data && data.length > 0) {
          this.reservadoBooks = data; // Livros reservados
        } else {
          this.message = "Você não tem livros reservados.";
        }
      } catch (error) {
        this.message = "Erro ao buscar os livros reservados.";
        console.error("Erro ao buscar livros reservados:", error.message);
      }
    },

    // Função para reservar um livro
    async reservarLivro(livroId) {
      const token = localStorage.getItem('token');
  
      if (!token) {
        this.message = "Você precisa estar logado para reservar um livro!";
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/reservar', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'  // Definindo o tipo de conteúdo como JSON
          },
          body: JSON.stringify({
            livroId: livroId  // Passando o id do livro para reservar
          })
        });

        if (!response.ok) {
          throw new Error('Erro ao tentar reservar o livro');
        }

        this.message = "Livro reservado com sucesso!";
        this.fetchReservados(); // Atualiza os livros reservados após reserva
      } catch (error) {
        this.message = "Erro ao tentar reservar o livro!";
        console.error("Erro ao reservar livro:", error.message);
      }
    }
  },
  mounted() {
    this.fetchUserData(); // Chama a função ao montar o componente
  }
};
</script>

<style scoped>
#reservado {
  font-family: 'Arial', sans-serif;
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
  align-items: center;
}

.book-cover {
  width: 100px;
  height: 150px;
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
.book-rented-date,
.book-return-date {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}
</style>
