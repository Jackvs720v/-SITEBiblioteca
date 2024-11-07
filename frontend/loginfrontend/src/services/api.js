import axios from 'axios'; //Importa axios para requisições HTTP

//Cria instância do Aixos com URL base da API
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/books', //URL base da API
    headers: {
        'Content-Type': 'application/json', //Define Json como tp de c
    },
});

//Exporta funções CRUD usando axios
export default {
    getBooks() {
        return apiClient.get('/'); //Get para listar os livros
    },
    addBook(book) {
    return apiClient.post('/',book) //POST para add os livros
    },
    updateBook(id,book){
        return apiClient.put(`/${id}`,book) //PUT para atualizar livro pelo ID
    },
    deleteBook(id){
        return apiClient.delete(`/${id}`) //Delete para excluir livro pelo ID
    },
};