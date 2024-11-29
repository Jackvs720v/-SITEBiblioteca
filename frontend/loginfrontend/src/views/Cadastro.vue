<template>
  <div class="register">
    <div class="register-header">
      <img src="@/assets/logoCadastro.png" alt="DreamBooks Logo" class="logo">
      <h1>Cadastrar</h1>
    </div>
    <form @submit.prevent="cadastroUser">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input v-model="nome" type="text" id="nome" required />
      </div>
      <div class="form-group">
        <label for="contato">Contato:</label>
        <input v-model="contato" type="tel" id="contato" required />
      </div>
      <div class="form-group">
        <label for="rua">Rua:</label>
        <input v-model="rua" type="text" id="rua" required />
      </div>
      <div class="form-group">
        <label for="bairro">Bairro:</label>
        <input v-model="bairro" type="text" id="bairro" required />
      </div>
      <div class="form-group">
        <label for="numero">Nº:</label>
        <input v-model="numero" type="number" id="numero" required />
      </div>
      <div class="form-group">
        <label for="username">Email:</label>
        <input v-model="username" type="email" id="username" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import api from '../axios'; // Importa a configuração do Axios

export default {
  data() {
    return {
      nome: '',
      contato: '',
      rua: '',
      bairro: '',
      numero: '',
      username: '',
      password: '',
    };
  },
  methods: {
    async cadastroUser() {
      try {
        const response = await api.post('/auth/register', {
          nome: this.nome,
          contato: this.contato,
          rua: this.rua,
          bairro: this.bairro,
          numero: this.numero,
          username: this.username,
          password: this.password, 
        });
        this.message = 'Cadastro bem-sucedido!';
        localStorage.setItem('token', response.data.token); // Armazena o token JWT no localStorage
        this.$router.push('/dashboard'); // Redireciona para a página principal após o cadastro
      } catch (error) {
        this.message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Erro ao fazer cadastro.';
      }
    },
  }
};
</script>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1c3b4c;
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.register-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 25%;
  margin-bottom: 5%;
}

h1 {
  color: white;
  font-size: 24px;
  margin: 0;
}

form {
  background-color: #2a4d61;
  padding: 20px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 350px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  color: white;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: box-shadow 0.3s;
  font-size: 14px;
}

input:focus {
  box-shadow: 0 0 5px 2px #007bff;
  outline: none;
}

button {
  padding: 12px;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 48%; /* Ajusta para manter uma boa largura entre os botões */
  transition: background-color 0.3s, transform 0.3s;
  color: #1c3b4c;
}

button:hover {
  background-color: #f0f0f0;
}

p {
  margin-top: 15px;
  color: #e74c3c;
  font-size: 14px;
}
</style>
