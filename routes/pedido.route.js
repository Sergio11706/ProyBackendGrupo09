const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controllers/pedido.controller');

router.get('/', pedidoCtrl.obtenerTodos);
router.post('/', pedidoCtrl.crear);
router.delete('/:id', pedidoCtrl.eliminar);
router.put('/tomar/:id', pedidoCtrl.tomarPedido);

module.exports = router;
