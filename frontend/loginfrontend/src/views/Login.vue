<template>
  <div class="login">
    <div class="login-header">
      <img src="@/assets/logo.png" alt="DreamBooks Logo" class="logo">
      <h1>Login</h1>
    </div>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="username" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <div class="button-group">
        <button type="submit">Logar</button>
        <button type="button" @click="forgotPassword">Esqueceu a senha?</button>
      </div>
      <div class="button-group">
        <!-- Altere aqui para usar $router.push -->
        <button type="button" @click="goToCadastro">Cadastro</button>
      </div>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import api from '../axios'; // Importa a configuração do Axios

export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });
        this.message = 'Login bem-sucedido!';
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        this.message = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Erro ao fazer login.';
      }
    },
    forgotPassword() {
      this.message = "Redirecionando para recuperação de senha.";
      // Lógica para recuperação de senha
    },
    // Método para redirecionar para a página de Cadastro
    goToCadastro() {
      this.$router.push('/cadastro');
    }
  }
};
</script>


<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1c3b4c;
  font-family: 'Arial', sans-serif;
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 80px;
  margin-bottom: 10px;
}

h1 {
  color: white;
}

form {
  background-color: #2a4d61;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
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
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 45%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #f0f0f0;
}

p {
  margin-top: 10px;
  color: #e74c3c;
}
</style>
