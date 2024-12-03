<template>
  <div>
    <!-- Navbar -->
    <NavBarAdm/>
    <!-- Profile Card -->
    <div class="profile-container">
      <h2>Informações Pessoais</h2>
      <div class="profile-card">
        <div class="profile-picture">
          <img :src="user.profilePicture" alt="Profile Picture" />
          <div class="status">
            <span class="online"></span> Online
          </div>
        </div>
        <div class="profile-details">
          <p><strong>Nome:</strong>
            <span v-if="!isEditing">{{ user.nome }}</span>
            <input v-else v-model="user.nome" type="text" placeholder="Nome" />
          </p>
          <p><strong>ID:</strong> #{{ user._id }}</p>
          <p><strong>Contato:</strong>
            <span v-if="!isEditing">{{ user.contato }}</span>
            <input v-else v-model="user.contato" type="text" placeholder="Contato" />
          </p>
          <p><strong>Endereço:</strong>
            <span v-if="!isEditing">{{ user.rua }}, </span>
            <input v-else v-model="user.rua" type="text" placeholder="Rua" />
            <span v-if="!isEditing"> Nº {{ user.numero }} </span>
            <input v-else v-model="user.numero" type="number" placeholder="Número" />
          </p>
          <p><strong>Bairro:</strong>
            <span v-if="!isEditing">{{ user.bairro }}</span>
            <input v-else v-model="user.bairro" type="text" placeholder="Bairro" />
          </p>
          <p><strong>Emprestimos:</strong>
            <span v-if="!isEditing">{{ user.emprestimos }}</span>
            <input v-else v-model="user.emprestimos" type="text" placeholder="Emprestimos" />
          </p>
        </div>
        <div class="profile-about">
          <p><strong>Sobre:</strong></p>
          <textarea v-if="isEditing" v-model="user.sobre" placeholder="Escreva algo sobre você..."></textarea>
          <p v-else>{{ user.sobre }}</p>
        </div>
      </div>
      <button class="edit-button" @click="editProfile()">{{ isEditing ? 'Salvar' : 'Editar Info' }}</button>
    </div>
  </div>
</template>

<script>
import NavBarAdm from '@/components/NavBarAdm.vue';
import axios from 'axios';

export default {
  name: "Profile",
  components: {
    NavBarAdm
  },
  data() {
    return {
      user: {
        nome: '',
        _id: '',
        contato: '',
        rua: '',
        bairro: '',
        numero: '',
        emprestimos: '',
        sobre: '',
        profilePicture: 'https://via.placeholder.com/100',
      },
      isEditing: false, // Controla o modo de edição
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.$router.push('/login'); // Redireciona para login se não houver token
    return;
  }

  try {
    const response = await axios.get('http://localhost:5000/api/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.user = response.data; // Atualiza os dados do usuário no estado
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error.response?.data || error.message);

    // Redireciona para o login se o token for inválido ou expirar
    if (error.response?.status === 401 || error.response?.status === 400) {
      alert('Sua sessão expirou. Faça login novamente.');
      this.$router.push('/login');
    } else {
      alert('Erro ao carregar os dados do perfil.');
    }
  }
},
editProfile() {
  if (this.isEditing) {
    // Salva os dados e, se houver erro, mantém o modo de edição ativo
    this.saveProfile();
  } else {
    // Alterna para o modo de edição
    this.isEditing = true;
  }
},
async saveProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    this.$router.push('/login'); // Redireciona se o token não existir
    return;
  }

  try {
    const response = await axios.put('http://localhost:5000/api/auth/user', this.user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Atualiza os dados do usuário e sai do modo de edição
    this.user = response.data;
    this.isEditing = false;
    alert('Perfil atualizado com sucesso!');
  } catch (error) {
    console.error("Erro ao salvar o perfil:", error.response?.data || error.message);

    // Mantém o modo de edição em caso de erro
    if (error.response?.status === 400) {
      alert('Erro nos dados enviados. Verifique as informações.');
    } else if (error.response?.status === 401) {
      alert('Sua sessão expirou. Faça login novamente.');
      this.$router.push('/login');
    } else {
      alert('Erro ao atualizar o perfil. Tente novamente mais tarde.');
    }
  }
}


  }
};
</script>

<style scoped>
.profile-container {
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.profile-card {
  background-color: #d0f0ff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-picture {
  flex: 1;
  text-align: center;
}

.profile-picture img {
  border-radius: 50%;
  border: 2px solid #66c5d4;
  width: 100px;
  height: 100px;
}

.status {
  margin-top: 10px;
  font-size: 14px;
  color: green;
}

.online {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-right: 5px;
}

.profile-details {
  flex: 2;
  text-align: left;
  margin-left: 20px;
}

.profile-about {
  flex: 1 100%;
  margin-top: 20px;
}

.profile-about textarea {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  resize: none;
}

.edit-button {
  background-color: #f7c8d0;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: #333;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
}

.edit-button:hover {
  background-color: #f3a3b3;
}
</style>
