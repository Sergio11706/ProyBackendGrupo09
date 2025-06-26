const express = require('express');
const router = express.Router();

const facturaCtrl = require('../controllers/factura.controller');

router.post('/crear', facturaCtrl.crearFactura);
router.get('/', facturaCtrl.obtenerTodas);

module.exports = router;
