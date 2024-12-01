<template>
    <div>
      <!-- Navbar -->
     <NavBarAdm/>
      <!-- Profile Card -->
      <div class="profile-container">
        <h2>Informações Pessoais</h2>
        <div class="profile-card">
          <div class="profile-picture">
            <img src="https://via.placeholder.com/100" alt="Profile Picture" />
            <div class="status">
              <span class="online"></span> Online
            </div>
          </div>
          <div class="profile-details">
            <p><strong>Nome:</strong> Eduardo777</p>
            <p><strong>ID:</strong> #00001</p>
            <p><strong>Contato:</strong> 19 98888-7745</p>
            <p><strong>Endereço:</strong> Rua Alameda, Nº 805</p>
            <p><strong>Bairro:</strong> Jd. Orlandia</p>
            <p><strong>Emprestimos:</strong> Vida Fora da Gangue</p>
          </div>
          <div class="profile-about">
            <p><strong>Sobre:</strong></p>
            <textarea placeholder="Lore"></textarea>
          </div>
        </div>
        <button class="edit-button">Editar Info</button>
      </div>
    </div>
  </template>
  
  <script>
  import NavBarAdm from '@/components/NavBarAdm.vue';
  export default {
    name: "Profile",
    components:{
        NavBarAdm
    }
  };
  </script>
  
  <style scoped>
  /* Navbar Styles */
  .navbar {
    background-color: #2c3e50;
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  .navbar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 20px;
  }
  .navbar a {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
  
  /* Profile Page Styles */
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
  .profile-details p {
    margin: 5px 0;
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
  