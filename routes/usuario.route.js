const usuarioCtrl = require('./../controllers/usuario.controller'); 
const authCtrl = require('./../controllers/auth.controller');

const express = require('express'); 
const router = express.Router(); 

router.get('/', authCtrl.verifyToken, usuarioCtrl.getUsuarios); 
router.post('/login', usuarioCtrl.loginUsuario); 
router.post('/', usuarioCtrl.createUsuario); 
router.put('/:id', authCtrl.verifyToken, usuarioCtrl.editUsuario); 
router.delete('/:id', authCtrl.verifyToken, usuarioCtrl.deleteUsuario);
router.get('/administrador/:id', authCtrl.verifyToken, usuarioCtrl.getAdministrador); 
router.get('/repartidores', authCtrl.verifyToken, usuarioCtrl.getRepartidores); 
router.get('/repartidor/:id', authCtrl.verifyToken, usuarioCtrl.getRepartidor); 
router.get('/cliente/:id', authCtrl.verifyToken, usuarioCtrl.getCliente); 
router.get('/aprobarSolicitud/:id', authCtrl.verifyToken, usuarioCtrl.aceptarSolicitud);
router.get('/rechazarSolicitud/:id', authCtrl.verifyToken, usuarioCtrl.rechazarSolicitud);
router.get('/usuariosPorMes', usuarioCtrl.getUsuariosPorMes);

module.exports = router; 