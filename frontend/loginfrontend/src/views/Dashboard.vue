<template>
  <div class="dashboard-app">
    <!-- Importando a Navbar -->
    <Navbar />

    <!-- Dashboard Content -->
    <div class="dashboard">
      <div class="content">
        <!-- Cards da linha superior -->
        <div class="card">
          <h2>Livros mais Emprestados</h2>
          <canvas id="pieChart"></canvas>
        </div>
        <div class="card">
          <h2>Usuários mais Ativos</h2>
          <canvas id="pieChartUsers"></canvas>
        </div>
      </div>

      <!-- Card e botão centralizados abaixo -->
      <div class="bottom-section">
        <div class="card">
          <h2>Histórico de Reservas</h2>
          <canvas id="barChart"></canvas>
        </div>
        <div class="pdf-button">
          <button @click="generatePDF">Gerar PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from "chart.js/auto";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Navbar from "../components/NavBarAdm.vue"; // Importando o componente Navbar

export default {
  components: {
    Navbar, // Registrando o componente
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF();
      
      // Captura do gráfico "Livros mais Emprestados"
      html2canvas(document.getElementById("pieChart")).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 10, 20, 180, 90); // Tamanho ajustado
        doc.text("Livros mais Emprestados", 10, 120);
        
        // Quebra de página após o primeiro gráfico
        doc.addPage();
        
        // Captura do gráfico "Usuários mais Ativos"
        html2canvas(document.getElementById("pieChartUsers")).then((canvas) => {
          const imgData2 = canvas.toDataURL("image/png");
          doc.addImage(imgData2, "PNG", 10, 20, 180, 90); // Tamanho ajustado
          doc.text("Usuários mais Ativos", 10, 120);
          
          // Quebra de página após o segundo gráfico
          doc.addPage();
          
          // Captura do gráfico "Histórico de Reservas"
          html2canvas(document.getElementById("barChart")).then((canvas) => {
            const imgData3 = canvas.toDataURL("image/png");
            doc.addImage(imgData3, "PNG", 10, 20, 180, 90); // Tamanho ajustado
            doc.text("Histórico de Reservas", 10, 120);
            
            // Salvar o PDF
            doc.save("dashboard.pdf");
          });
        });
      });
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
      });

      // Gráfico de barras para "Histórico de Reservas"
      new Chart(document.getElementById("barChart").getContext("2d"), {
        type: "bar",
        data: {
          labels: ["Vida Fora da Gangue", "O Menino Maluquinho", "O Príncipe"],
          datasets: [
            {
              label: "Reservas",
              data: [50, 70, 40],
              backgroundColor: ["#ff6384", "#36a2eb", "#4bc0c0"],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "top", // Posição da legenda
            },
          },
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
      });
    },
  },
  mounted() {
    this.createCharts();
  },
};
</script>

<style scoped>
.pdf-button button {
  background-color: #007bff;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pdf-button button:hover {
  background-color: #0056b3;
}

.pdf-button button:focus {
  outline: none;
}

.dashboard-app {
  font-family: "Arial", sans-serif;
  background-color: #133957;
  color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.card {
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 260px; /* Reduzir altura */
}

.card h2 {
  margin-bottom: 10px; /* Reduzir espaço do título */
  font-size: 1.2em; /* Tamanho de fonte menor */
}

canvas {
  margin: auto;
  max-width: 90%; /* Aumentar a área dos gráficos */
  max-height: 85%; /* Ajustar para gráficos maiores */
}

/* Bottom Section */
.bottom-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.bottom-section .card {
  width: 80%; /* Diminuir a largura do card */
  margin-bottom: 15px;
}
</style>
