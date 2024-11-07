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
        <button type="button" @click="goToCadastro">Cadastro</button>
        <button type="button" @click="goToCrud">Crud</button>

      </div>
      <div class="button-group">
        
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
    },
    goToCrud(){
      this.$router.push('/appbook');
    }
  }
};
</script>
<style scoped>
/* Estilos principais da página de login */
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1c3b4c, #274c64);
  font-family: 'Arial', sans-serif;
}

/* Cabeçalho do login */
.login-header {
  text-align: center;
  margin-bottom: 20px;
}

.logo {
  width: 50%;
  margin-bottom: 10%;
}

h1 {
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
}

/* Formulário de login */
form {
  background-color: #2a4d61;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 320px;
  text-align: center;
}

/* Grupos de formulários */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  color: #ffffff;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px;
}

/* Campo de entrada */
input {
  width: 100%;
  padding: 12px;
  border: 2px solid #2a4d61;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #f5f7f9;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
  outline: none;
}

/* Grupo de botões */
.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

button {
  padding: 10px 15px;
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 48%; /* Ajusta para manter uma boa largura entre os botões */
  transition: background-color 0.3s, transform 0.3s;
  color: #1c3b4c;
}

button:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}

/* Mensagem de erro */
p {
  margin-top: 15px;
  color: #e74c3c;
  font-size: 14px;
  font-weight: bold;
}
</style>
