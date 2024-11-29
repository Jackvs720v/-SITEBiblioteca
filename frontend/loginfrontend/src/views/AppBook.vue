<template>
  <div id="appBook">
<!--Formulário para adicionar ou editar um livro-->
<BookForm :bookToEdit="bookToEdit" @book-added="fetchBooks" @book-updated="fetchBooks" />
<!--Lista de livros-->
<BookList @edit-book="setBookToEdit" ref="bookList" />
  </div>
</template>

<script>
import BookList from '../components/BookList.vue'
import BookForm from '../components/BookForm.vue'

export default {
  data() {
    return {
      bookToEdit: null,
    }
  },
  components:{
    BookList,
    BookForm,
  },
  methods: {
    //Função para definir o livro que será editado
    setBookToEdit(book){
      this.bookToEdit = book
    },
    //Função para atualizar a lista de livros após adicionar ou editar
    fetchBooks(){
      this.$refs.bookList.fetchBooks();
      this.bookToEdit = null; //Limpa o formulário após a ação
    },
  },
  mounted() {
    this.fetchBooks(); // Adiciona isso para garantir que a lista de livros seja carregada ao inicializar o componente
  },
  };
</script>

<style>
#appBook {
  font-family: 'Poppins', Arial, sans-serif; /* Fonte moderna */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #34495e; /* Cor mais escura e suave para o texto */
  margin-top: 60px;
  padding: 20px;
  background-color: #f4f7f9; /* Cor de fundo clara e suave */
  min-height: 100vh; /* Garante que a página tenha altura mínima */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  background-color: #3498db; /* Azul suave para o botão */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9; /* Cor mais escura ao passar o mouse */
}

form {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
  padding: 20px;
  width: 300px;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  display: block;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
}

input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

h1 {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
}

#app h1 {
  text-transform: uppercase;
  letter-spacing: 1px;
}

.book-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
}

.book-item {
  background-color: #ecf0f1;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-item:hover {
  background-color: #d5dde1;
}

.book-item button {
  background-color: #e74c3c; /* Vermelho para botão de ação */
  padding: 5px 10px;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.book-item button:hover {
  background-color: #c0392b; /* Cor mais escura ao passar o mouse */
}

</style>
