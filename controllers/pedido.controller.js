const Pedido = require('../models/pedido');

exports.obtenerTodos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('productos.producto') 
      .populate('repartidor');

    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({
      mensaje: 'Error al obtener los pedidos',
      error: error
    });
  }
};

exports.crear = async (req, res) => {
  try {
    const nuevo = new Pedido(req.body);
    const guardado = await nuevo.save();
    res.json(guardado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear el pedido', error: err });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar', error: err });
  }
};
