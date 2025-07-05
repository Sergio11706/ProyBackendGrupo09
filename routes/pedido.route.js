const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controllers/pedido.controller');
const authCtrl = require('../controllers/auth.controller');

router.get('/', pedidoCtrl.obtenerTodos);
router.post('/', authCtrl.verifyToken, pedidoCtrl.crear);
router.delete('/:id', authCtrl.verifyToken, pedidoCtrl.eliminar);
router.put('/:id', authCtrl.verifyToken, pedidoCtrl.modificarPedido);

module.exports = router;
