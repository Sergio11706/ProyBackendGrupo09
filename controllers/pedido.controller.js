const Pedido = require('../models/pedido');
const { Producto } = require('../models/producto');

const pedidoCtrl = {};

// Obtener todos los pedidos
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

// Crear un nuevo pedido con control de stock
pedidoCtrl.crear = async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);

    // Validar stock suficiente
    for (const item of nuevoPedido.productos) {
      const producto = await Producto.findById(item.producto);
      if (!producto) {
        return res.status(404).json({ msg: `Producto no encontrado: ${item.producto}` });
      }
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ msg: `Stock insuficiente para ${producto.nombre}` });
      }
    }

    // Descontar stock
    for (const item of nuevoPedido.productos) {
      await Producto.findByIdAndUpdate(
        item.producto,
        { $inc: { stock: -item.cantidad } },
        { new: true }
      );
    }

    // Guardar pedido
    const guardado = await nuevoPedido.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error('Error al crear el pedido:', err);
    res.status(500).json({ mensaje: 'Error al crear el pedido', error: err });
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
pedidoCtrl.tomarPedido = async (req, res) => {
  try {
    const pedidoId = req.params.id;
    const repartidorId = req.body.repartidor;

    if (!repartidorId) {
      return res.status(400).json({ mensaje: 'Falta el ID del repartidor' });
    }

    const pedido = await Pedido.findByIdAndUpdate(
      pedidoId,
      { repartidor: repartidorId, estado: 'en camino' },
      { new: true }
    );

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.json({ mensaje: 'Pedido asignado correctamente', pedido });
  } catch (err) {
    console.error('Error al tomar el pedido:', err);
    res.status(500).json({ mensaje: 'Error al tomar el pedido', error: err });
  }
};

module.exports = pedidoCtrl;
