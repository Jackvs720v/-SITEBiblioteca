const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    contato: { type: String, required: true },
    rua: { type: String, required: true },
    bairro: { type: String, required: true },
    numero: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sobre: { type: String, required: true },
    reservations: {
        type: [{ bookId: mongoose.Schema.Types.ObjectId, reservedAt: Date }],
        default: []
    },
    reservationLimit: { type: Number, default: 3 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
