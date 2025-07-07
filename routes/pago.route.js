const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pago.controller');

// Crear preferencia de pago
router.post('/crear-preferencia', pagoController.crearPreferencia);

// Webhook para notificaciones de Mercado Pago
router.post('/webhook', pagoController.webhook);

// Obtener información de un pago
router.get('/payment/:paymentId', pagoController.getPaymentInfo);

// Obtener estado de un pedido
router.get('/pedido/:pedidoId', pagoController.getPedidoStatus);

module.exports = router; 