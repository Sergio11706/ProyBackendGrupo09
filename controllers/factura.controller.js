const Factura = require('../models/factura');

exports.crearFactura = async (req, res) => {
  try {
    const nueva = new Factura(req.body);
    const guardada = await nueva.save();
    res.json(guardada);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear factura', error: err });
  }
};

exports.obtenerTodas = async (req, res) => {
  try {
    const lista = await Factura.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener facturas', error: err });
  }
};
