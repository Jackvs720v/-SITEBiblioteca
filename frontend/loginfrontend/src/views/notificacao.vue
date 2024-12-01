<template>
    <div>
      <!-- Navbar -->
      <NavBarAdm />
  
      <!-- Notifications Container -->
      <div class="notifications-container">
        <h2>Notificações</h2>
        <ul class="notification-list">
          <li 
            class="notification-item" 
            v-for="notification in notifications" 
            :key="notification.id"
          >
            <div class="notification-content">
              <h4>{{ notification.title }}</h4>
              <p>{{ notification.message }}</p>
            </div>
            <span :class="{'status-unread': !notification.read, 'status-read': notification.read}">
              {{ notification.read ? 'Lida' : 'Não Lida' }}
            </span>
            <button class="mark-read-button" @click="markAsRead(notification.id)" v-if="!notification.read">
              Marcar como lida
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import NavBarAdm from "@/components/NavBarAdm.vue";
  
  export default {
    name: "Notifications",
    components: {
      NavBarAdm,
    },
    data() {
      return {
        notifications: [
          { id: 1, title: "Novo Empréstimo", message: "Seu empréstimo foi aprovado!", read: false },
          { id: 2, title: "Atualização de Cadastro", message: "Seu perfil foi atualizado com sucesso.", read: true },
          { id: 3, title: "Atraso no Empréstimo", message: "Devolva o livro 'Clean Code' até amanhã.", read: false },
        ],
      };
    },
    methods: {
      markAsRead(id) {
        const notification = this.notifications.find((notif) => notif.id === id);
        if (notification) notification.read = true;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Notifications Page Styles */
  .notifications-container {
    margin: 20px auto;
    width: 90%;
    max-width: 600px;
    text-align: center;
    font-family: 'Poppins', Arial, sans-serif;
    background-color: #d0f0ff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .notifications-container h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #34495e;
  }
  
  .notification-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .notification-item {
    background-color: #ecf0f1;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .notification-item:hover {
    background-color: #d5dde1;
  }
  
  .notification-content {
    text-align: left;
  }
  
  .notification-content h4 {
    margin: 0;
    font-size: 18px;
    color: #2c3e50;
  }
  
  .notification-content p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #7f8c8d;
  }
  
  .status-unread {
    color: #e74c3c; /* Red */
    font-weight: bold;
  }
  
  .status-read {
    color: #2ecc71; /* Green */
    font-weight: bold;
  }
  
  .mark-read-button {
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #3498db; /* Blue */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .mark-read-button:hover {
    background-color: #2980b9;
  }
  </style>
  