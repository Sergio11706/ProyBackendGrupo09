const productoCtrl = require('./../controllers/producto.controller'); 
const authCtrl = require('./../controllers/auth.controller');

const express = require('express'); 
const router = express.Router(); 

router.get('/', authCtrl.verifyToken, productoCtrl.getProductos); 
router.post('/', authCtrl.verifyToken, productoCtrl.createProducto); 
router.put('/:id', authCtrl.verifyToken, productoCtrl.editProducto); 
router.delete('/:id', authCtrl.verifyToken, productoCtrl.deleteProducto);
router.get('/ingredientes', authCtrl.verifyToken, productoCtrl.getIngredientes); 
router.get('/bebidas', authCtrl.verifyToken, productoCtrl.getBebidas); 

module.exports = router; 