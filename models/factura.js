const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacturaSchema = new Schema({
  numero: {
    type: String,
    required: true,
    unique: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  cliente: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  detalle: [
    {
      producto: {
        type: String,
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      },
      precioUnitario: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Factura', FacturaSchema);
