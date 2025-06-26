const mongoose = require('mongoose');
const { Schema } = mongoose;

const PedidoSchema = new Schema({
  cliente: {
    type: String,
    required: true
  },
  productos: [
    {
      producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
      },
      cantidad: {
        type: Number,
        required: true
      }
    }
  ],
  repartidor: {
    type: Schema.Types.ObjectId,
    ref: 'Repartidor',
    required: false
  },
  estado: {
    type: String,
    enum: ['pendiente', 'preparando', 'en camino', 'entregado'],
    default: 'pendiente'
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  direccionEntrega: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
