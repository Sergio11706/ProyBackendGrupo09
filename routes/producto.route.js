const productoCtrl = require('./../controllers/producto.controller'); 

const express = require('express'); 
const router = express.Router(); 

router.get('/', productoCtrl.getProductos); 
router.post('/', productoCtrl.createProducto); 
router.put('/:id', productoCtrl.editProducto); 
router.delete('/:id', productoCtrl.deleteProducto);
router.get('/ingredientes', productoCtrl.getIngredientes); 
router.get('/bebidas', productoCtrl.getBebidas); 

module.exports = router; 