const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controllers/pedido.controller');

router.get('/', pedidoCtrl.obtenerTodos);
router.post('/', pedidoCtrl.crear);
router.delete('/:id', pedidoCtrl.eliminar);

module.exports = router;
