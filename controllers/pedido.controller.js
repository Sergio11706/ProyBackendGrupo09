const Pedido = require('../models/pedido');

const pedidoCtrl = {};

pedidoCtrl.obtenerTodos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('productos.producto') 
      .populate('repartidor');

    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(400).json({
      mensaje: 'Error al obtener los pedidos',
      error: error
    });
  }
};

pedidoCtrl.crear = async (req, res) => {
  try {
    const nuevo = new Pedido(req.body);
    const guardado = await nuevo.save();
    res.json({
      mensaje: 'Pedido guardado',
      guardado
    });
  } catch (err) {
    res.status(400).json({ mensaje: 'Error al crear el pedido', error: err });
  }
};

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

module.exports = pedidoCtrl;
