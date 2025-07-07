const mongoose = require('mongoose');

const comboSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    imagen: {
        type: String,
        required: true
    },
    componentes: [{
        type: String,
        required: true
    }],
    disponible: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Clásicos', 'Especiales', 'Vegetariano', 'Familiar', 'Premium', 'Económico']
    },
    stock: {
        type: Number,
        default: 100,
        min: 0
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Combo', comboSchema); 