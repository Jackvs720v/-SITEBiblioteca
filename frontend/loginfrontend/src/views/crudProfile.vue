<template>
    <div>
      <!-- Navbar -->
      <NavBarAdm />
  
      <!-- User List Container -->
      <div class="user-list-container">
        <h2>Lista de Usuários</h2>
        <table class="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Status</th>
              <th>Histórico de Empréstimos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td class="user-info">
                <img class="user-avatar" src="https://via.placeholder.com/50" alt="User Avatar" />
                <span>{{ user.name }}</span>
              </td>
              <td>{{ user.id }}</td>
              <td>
                <span :class="{'status-online': user.status === 'Online', 'status-offline': user.status !== 'Online'}">
                  {{ user.status }}
                </span>
              </td>
              <td>
                <button class="action-button add-button">+</button>
                <button class="action-button remove-button">x</button>
                <button class="action-button history-button">🔄</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import NavBarAdm from '@/components/NavBarAdm.vue';
  
  export default {
    name: "UserList",
    components: {
      NavBarAdm,
    },
    data() {
      return {
        users: [
          { name: "Cleiton1974", id: "#00001", status: "Online" },
          { name: "Cleiton1974", id: "#00002", status: "Online" },
          { name: "Cleiton1974", id: "#00003", status: "Online" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* User List Page Styles */
  .user-list-container {
    margin: 20px auto;
    width: 90%;
    max-width: 800px;
    text-align: center;
    font-family: 'Poppins', Arial, sans-serif;
    background-color: #d0f0ff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-list-container h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #34495e;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .user-table th,
  .user-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
  }
  
  .user-table th {
    background-color: #66c5d4;
    color: white;
    font-size: 16px;
  }
  
  .user-table td {
    background-color: #ecf0f1;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  .status-online {
    color: green;
    font-weight: bold;
  }
  
  .status-offline {
    color: red;
    font-weight: bold;
  }
  
  .action-button {
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
  
  .add-button {
    background-color: #2ecc71; /* Green */
    color: white;
  }
  
  .add-button:hover {
    background-color: #27ae60;
  }
  
  .remove-button {
    background-color: #e74c3c; /* Red */
    color: white;
  }
  
  .remove-button:hover {
    background-color: #c0392b;
  }
  
  .history-button {
    background-color: #3498db; /* Blue */
    color: white;
  }
  
  .history-button:hover {
    background-color: #2980b9;
  }
  </style>
  