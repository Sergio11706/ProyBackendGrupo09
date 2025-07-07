const Pedido = require('../models/pedido');
const { Producto } = require('../models/producto');

const pedidoCtrl = {};

// Obtener todos los pedidos
pedidoCtrl.obtenerTodos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate('cliente').populate('repartidor').then(pedidos => {
      res.json(pedidos);
    });
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(400).json({
      mensaje: 'Error al obtener los pedidos',
      error: error
    });
  }
};

// Crear un nuevo pedido con control de stock
pedidoCtrl.crear = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    await nuevoPedido.save();
    res.json(nuevoPedido);
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear el pedido',
      error: error
    });
  }
};

// Eliminar un pedido
pedidoCtrl.eliminar = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({
      mensaje: 'Pedido eliminado',
      id: req.params.id
    });
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al eliminar', error: err });
  }
};

// Asignar repartidor a un pedido
pedidoCtrl.modificarPedido = async (req, res) => {
  try {
    const {_id, ...datosActualizados} = req.body;
    const pedidoModificado = await Pedido.findByIdAndUpdate(
      _id,
      datosActualizados,
      { new: true }
    );
    res.json({ pedidoModificado });
  } catch (err) {
    console.error('Error al modificar el pedido:', err);
    res.status(400).json({ mensaje: 'Error al modificar el pedido', error: err });
  }
};

module.exports = pedidoCtrl;
