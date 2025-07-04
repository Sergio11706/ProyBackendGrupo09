const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controllers/pedido.controller');
const authCtrl = require('../controllers/auth.controller');

router.get('/', authCtrl.verifyToken, pedidoCtrl.obtenerTodos);
router.post('/', authCtrl.verifyToken, pedidoCtrl.crear);
router.delete('/:id', authCtrl.verifyToken, pedidoCtrl.eliminar);
router.put('/tomar/:id', authCtrl.verifyToken, pedidoCtrl.tomarPedido);

module.exports = router;
