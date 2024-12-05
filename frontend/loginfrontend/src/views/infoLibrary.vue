<template>
    <div>
      <!-- Navbar -->
      <NavBarAdm />
  
      <!-- Content -->
      <div class="loan-policy-container">
        <h1>Política de Empréstimo de Livros da Biblioteca</h1>
        <p><strong>Horário de funcionamento:</strong> 5h às 23h</p>
  
        <section v-for="(section, index) in sections" :key="index" class="policy-section">
          <h2>{{ section.title }}</h2>
          <ul>
            <li v-for="(item, itemIndex) in section.items" :key="itemIndex">{{ item }}</li>
          </ul>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import NavBarAdm from '@/components/NavBarAdm.vue';
  
  export default {
    name: 'LoanPolicy',
    components: {
      NavBarAdm
    },
    data() {
      return {
        sections: [
          {
            title: "Público-alvo",
            items: [
              "A Biblioteca oferece serviços de empréstimos para os seguintes grupos:",
              "Membros da comunidade que possuem cadastro."
            ]
          },
          {
            title: "Cadastro e Habilitação para Empréstimos",
            items: [
              "Para realizar empréstimos, é necessário estar cadastrado na biblioteca, apresentando um documento oficial com foto e comprovante de vínculo com a instituição ou residência (no caso de membros da comunidade).",
              "Cada usuário terá um número limite de livros que pode emprestar, dependendo da categoria (aluno, professor, comunidade)."
            ]
          },
          {
            title: "Renovação de Empréstimos",
            items: [
              "Os empréstimos podem ser renovados por mais um período igual, desde que não haja reservas para o material.",
              "Renovação pode ser feita presencialmente, por telefone ou via sistema online da biblioteca."
            ]
          },
          {
            title: "Atrasos e Penalidades",
            items: [
              "O atraso na devolução de materiais implicará em uma multa diária de R$1,00 por livro.",
              "Caso o usuário acumule mais de 3 dias de atraso ou R$10,00 em multas, será bloqueado para novos empréstimos até a regularização."
            ]
          },
          {
            title: "Exceções",
            items: [
              "Livros de consulta, periódicos e materiais especiais (como obras raras) não estão disponíveis para empréstimo domiciliar, podendo ser consultados apenas nas dependências da biblioteca."
            ]
          },
          {
            title: "Direitos e Responsabilidades dos Usuários",
            items: [
              "É responsabilidade do usuário devolver os materiais no prazo estipulado e em boas condições.",
              "A biblioteca se reserva o direito de alterar as políticas de empréstimo conforme a necessidade, informando previamente os usuários."
            ]
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .loan-policy-container {
    margin: 20px auto;
    padding: 20px;
    max-width: 800px;
    background-color: #f0f8ff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
  }
  
  .loan-policy-container h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #007acc;
  }
  
  .policy-section {
    margin-bottom: 20px;
  }
  
  .policy-section h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #005b99;
  }
  
  .policy-section ul {
    padding-left: 20px;
    list-style-type: disc;
  }
  
  .policy-section li {
    margin-bottom: 8px;
  }
  
  p {
    font-size: 16px;
    color: #333;
  }
  </style>
  