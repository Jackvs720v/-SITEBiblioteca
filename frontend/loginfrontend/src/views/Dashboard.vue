<template>
  <div class="dashboard">
    <div class="header">
      <h1>BookDash</h1>
      <div class="icons">
        <i class="fas fa-search"></i>
        <i class="fas fa-filter"></i>
        <i class="fas fa-user"></i>
        <i class="fas fa-bell"></i>
      </div>
    </div>
    <div class="content">
      <div class="card">
        <h2>Livros mais Emprestados</h2>
        <canvas id="pieChart"></canvas>
      </div>
      <div class="card">
        <h2>Usuários mais Ativos</h2>
        <canvas id="pieChartUsers"></canvas>
      </div>
      <div class="card">
        <h2>Histórico de Reservas</h2>
        <canvas id="barChart"></canvas>
      </div>
      <div class="card pdf-button">
        <button @click="generatePDF">Gerar PDF</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";

export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    generatePDF() {
      alert("PDF Gerado!");
    },
    createCharts() {
      // Gráfico de pizza para "Livros mais Emprestados"
      new Chart(document.getElementById("pieChart").getContext("2d"), {
        type: "pie",
        data: {
          labels: ["Vida Fora da Gangue", "O Menino Maluquinho", "O Príncipe"],
          datasets: [
            {
              data: [33.33, 33.33, 33.33],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // Gráfico de barras para "Histórico de Reservas"
      new Chart(document.getElementById("barChart").getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Vida Fora da Gangue", "O Menino Maluquinho", "O Príncipe"],
          datasets: [
            {
              data: [50, 70, 40],
              backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // Gráfico de pizza para "Usuários mais Ativos"
      new Chart(document.getElementById("pieChartUsers").getContext("2d"), {
        type: "pie",
        data: {
          labels: ["Cleiton1974", "Eduardo777", "Seila674"],
          datasets: [
            {
              data: [40, 35, 25],
              backgroundColor: ["#36a2eb", "#ff6384", "#4bc0c0"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    },
  },
  mounted() {
    this.createCharts();
  },
};
</script>

<style scoped>
.dashboard {
  background-color: #d1e7ff;
  font-family: "Arial", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #4c84e5;
  color: #fff;
}

.header h1 {
  margin: 0;
}

.icons i {
  margin-left: 10px;
  cursor: pointer;
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Duas colunas */
  gap: 20px; /* Espaçamento entre os elementos */
  padding: 20px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  height: 250px;
}

.pdf-button {
  grid-column: span 2; /* Botão ocupa toda a largura */
  text-align: center;
}

.pdf-button button {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.pdf-button button:hover {
  background-color: #c82333;
}
</style>
