<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <input v-model="book.title" placeholder="Título" required/>
    <input v-model="book.author" placeholder="Autor" required/>
    <input v-model="book.year" placeholder="Ano" required/>
    <input v-model="book.isbn" placeholder="ISBN" required/>
    
    <!-- Campo para selecionar a imagem -->
    <input type="file" @change="handleFileChange"/>

    <!-- Exibe a imagem selecionada -->
    <div v-if="selectedImage">
      <img :src="imagePreview" alt="Imagem do livro" style="max-width: 200px; margin-top: 10px;" />
    </div>

    <!-- Exibe a imagem carregada do livro, se houver -->
    <div v-else-if="book.image">
      <img :src="book.image" alt="Imagem do livro" style="max-width: 200px; margin-top: 10px;" />
    </div>

    <input v-model="book.editora" placeholder="Editora" required/>
    <textarea v-model="book.sinopse" placeholder="Sinopse" required></textarea>
    
    <!-- Adicione o campo de quantidade -->
    <input type="number" v-model.number="book.quantidade" placeholder="Quantidade" min="0" required/>

    <button type="submit">{{ book._id ? 'Atualizar' : 'Adicionar' }}</button>
  </form>
</template>

<script>
import api from '../services/api'; // Importa o serviço API para fazer requisições

export default {
  props: ['bookToEdit'],
  data() {
    return {
      book: this.bookToEdit || { 
        title: '', 
        author: '', 
        year: null, 
        isbn: '', 
        image: null, 
        editora: '', 
        sinopse: '', 
        quantidade: 0 // Inicialize quantidade
      },
      selectedImage: null, // Guardar a imagem selecionada
      imagePreview: null, // Guardar a URL da imagem para pré-visualização
    };
  },
  watch: {
    bookToEdit: {
      immediate: true,
      handler(newVal) {
        this.book = newVal || { 
          title: '', 
          author: '', 
          year: null, 
          isbn: '', 
          image: null, 
          editora: '', 
          sinopse: '', 
          quantidade: 0 // Garante que o valor inicial é 0 se não for passado
        };
        if (newVal && newVal.image) {
          // Caso o livro tenha uma imagem, defina a URL da imagem
          this.imagePreview = newVal.image;
        }
      },
    },
  },
  methods: {
    handleFileChange(event) {
      // Armazena o arquivo da imagem selecionada
      this.selectedImage = event.target.files[0];
      // Cria a URL de pré-visualização da imagem
      this.imagePreview = URL.createObjectURL(this.selectedImage);
    },
    // Função para enviar o formulário
    handleSubmit() {
      console.log("Conteúdo de selectedImage:", this.selectedImage);
      const formData = new FormData();
      formData.append('title', this.book.title);
      formData.append('author', this.book.author);
      formData.append('year', this.book.year);
      formData.append('isbn', this.book.isbn);
      formData.append('editora', this.book.editora);
      formData.append('sinopse', this.book.sinopse);
      formData.append('quantidade', this.book.quantidade); // Inclua o campo quantidade

      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }

      console.log("Dados enviados:", Array.from(formData.entries()));

      if (this.book._id) {
        api.updateBook(this.book._id, formData).then(() => {
          this.$emit('book-updated');
          window.location.reload(); // Recarrega a página após a atualização
        });
      } else {
        api.addBook(formData).then(() => {
          this.$emit('book-added');
          window.location.reload(); // Recarrega a página após a adição
        });
      }
    },
  },
};
</script>
