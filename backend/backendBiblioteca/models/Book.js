const mongoose = require('mongoose') //Metodo mongoose, método responsavel por 

//Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    year: {type:Number},
    isbn:{type: String, required: true},
    image:{type: String},
    editora:{type: String},
    sinopse:{type: String}
});

//Exportando o modelo
module.exports = mongoose.model('Book',BookSchema); 
