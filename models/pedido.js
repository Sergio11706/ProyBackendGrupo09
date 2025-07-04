const mongoose = require('mongoose');
const { Producto } = require('./producto');
const { Schema } = mongoose;

const PedidoSchema = new Schema({
  nombre: {type: String, required: true},
  cliente: {type: Schema.Types.ObjectId, ref: 'Cliente', required: false},
  productos: [{type: Producto.schema, ref: 'Producto', required: true}],
  repartidor: {type: Schema.Types.ObjectId, ref: 'Repartidor', required: false},
  imagen: {type: String, required: false},
  estado: {type: String, enum: ['pendiente', 'preparando', 'en camino', 'entregado'], required: true},
  fecha: {type: Date, required: false},
  direccionEntrega: {type: String, required: false},
  total: {type: Number, required: true}
});

module.exports = mongoose.model('Pedido', PedidoSchema);
