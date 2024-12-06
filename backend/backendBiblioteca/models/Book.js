const mongoose = require('mongoose'); // Método mongoose, responsável por interagir com o banco de dados

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    isbn: { type: String, required: true },
    image: { type: String },
    editora: { type: String },
    sinopse: { type: String },
    paginas: { type: String },
    copias: { type: String },
    rating: { 
        type: Number, 
        min: 0, 
        max: 5, 
        default: 0, // Valor padrão, caso a avaliação não tenha sido atribuída
        required: false 
    },
    ratingSum: { 
        type: Number, 
        default: 0, // Inicia com 0, para acumular a soma das avaliações
    },
    ratingCount: { 
        type: Number, 
        default: 0, // Inicia com 0, para contar o número total de avaliações
    },
    available: { type: Number, default: 0 },  // Cópias disponíveis
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
