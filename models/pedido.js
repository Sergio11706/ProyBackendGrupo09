const mongoose = require('mongoose');
const { Producto } = require('./producto');
const { Schema } = mongoose;

const PedidoSchema = new Schema({
  nombre: {type: String, required: false},
  cliente: {type: Schema.Types.ObjectId, ref: 'Cliente', required: false},
  productos: [{type: Producto.schema, ref: 'Producto', required: true}],
  repartidor: {type: Schema.Types.ObjectId, ref: 'Repartidor', required: false},
  imagen: {type: String, required: false},
  estado: {type: String, enum: ['preparando', 'listo', 'en camino', 'entregado'], required: false},
  fecha: {type: Date, required: false},
  total: {type: Number, required: true},
  muestra: {type: Boolean, required: true},
  pagado: {type: Boolean, required: false}
});

module.exports = mongoose.model('Pedido', PedidoSchema);
