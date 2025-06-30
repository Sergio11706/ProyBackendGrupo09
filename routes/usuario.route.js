const usuarioCtrl = require('./../controllers/usuario.controller'); 

const express = require('express'); 
const router = express.Router(); 

router.get('/', usuarioCtrl.getUsuarios); 
router.post('/login', usuarioCtrl.loginUsuario); 
router.post('/', usuarioCtrl.createUsuario); 
router.put('/:id', usuarioCtrl.editUsuario); 
router.delete('/:id', usuarioCtrl.deleteUsuario);
router.get('/administrador/:id', usuarioCtrl.getAdministrador); 
router.get('/repartidores', usuarioCtrl.getRepartidores); 
router.get('/repartidor/:id', usuarioCtrl.getRepartidor); 
router.get('/cliente/:id', usuarioCtrl.getCliente); 
router.get('/aprobarSolicitud/:id', usuarioCtrl.aceptarSolicitud);
router.get('/rechazarSolicitud/:id', usuarioCtrl.rechazarSolicitud);

module.exports = router; 