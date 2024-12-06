
<template>
  <div id="login">
    <div class="login-header">
      <img src="@/assets/logoLogin.png" alt="DreamBooks Logo" class="logo">
      <h1>DreamBooks</h1>
    </div>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="username" type="email" id="email" placeholder="Digite seu email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input v-model="password" type="password" id="password" placeholder="Digite sua senha" required />
      </div>
      <div class="button-group">
        <button type="submit">Logar</button>
        <button type="button" @click="forgotPassword">Esqueceu a senha?</button>
        <button type="button" @click="goToCadastro">Cadastro</button>
        <button type="button" @click="goToCrud">Crud</button>
      </div>
    </form>
    <p v-if="message">{{ message }}</p>
 
    <!-- Exibindo as informações do usuário -->
    <div v-if="user">
      <h3>Informações do Usuário</h3>
      <p><strong>Nome:</strong> {{ user.nome }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Sobre:</strong> {{ user.sobre }}</p>
    </div>
  </div>
</template>
 
<script>
import api from '../axios';
 
export default {
  data() {
    return {
      username: '',
      password: '',
      message: '',
      user: null, // Adicionando o campo para armazenar os dados do usuário
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });

        // Armazenando token no localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId)
        this.message = 'Login bem-sucedido!';
        
        // Carregar dados do usuário
        await this.fetchUserData();

        // Redirecionar para a próxima página
        this.$router.push('/mainFrame');
      } catch (error) {
        this.message = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      }
    },

    async fetchUserData() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.message = 'Token não encontrado. Faça login novamente.';
        return;
      }

      try {
        const response = await api.get('/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.user = response.data;
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
        this.message = 'Erro ao carregar dados do usuário.';
      }
    },

    forgotPassword() {
      this.message = "Redirecionando para recuperação de senha.";
    },

    goToCadastro() {
      this.$router.push('/cadastro');
    },

    goToCrud() {
      this.$router.push('/appbook');
    }
  }
};
</script>
 
<style scoped>
/* Ajustando para ocupar a tela inteira */
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #1c3b4c, #274c64);
  font-family: 'Arial', sans-serif;
}
 
/* Centralizando o cabeçalho */
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
  font-size: 36px;
  font-weight: bold;
  margin: 0;
}
 
/* Ajuste do formulário */
form {
  background-color: #2a4d61;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 320px;
  text-align: center;
}
 
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
 
input {
  width: 100%;
  padding: 12px;
  border: 2px solid #2a4d61;
  border-radius: 8px;
  background-color: #f5f7f9;
  transition: border-color 0.3s, box-shadow 0.3s;
}
 
input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.4);
  outline: none;
}
 
/* Centralizando botões */
.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
 
button {
  padding: 12px;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 48%;
  color: #1c3b4c;
  transition: background-color 0.3s, transform 0.3s;
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