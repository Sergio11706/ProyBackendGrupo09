const mongoose = require('mongoose');
const { Schema } = mongoose;

const PedidoSchema = new Schema({
  items: [{
    _id: String,
    nombre: String,
    descripcion: String,
    precio: Number,
    imagen: String,
    componentes: [String],
    cantidad: Number
  }],
  customerInfo: {
    nombre: String,
    email: String,
    telefono: String,
    direccion: String,
    codigoPostal: String
  },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pendiente', 'pagado', 'rechazado', 'en_proceso', 'preparando', 'listo', 'en_camino', 'entregado'], 
    default: 'pendiente' 
  },
  paymentMethod: { type: String, default: 'mercadopago' },
  paymentId: String,
  fecha: { type: Date, default: Date.now },
  repartidor: { type: Schema.Types.ObjectId, ref: 'Repartidor', required: false }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
