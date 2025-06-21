const {Producto, Bebida, Ingrediente} = require('../models/producto'); 
const productoCtrl = {} 

productoCtrl.getProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
}	

productoCtrl.createProducto = async (req, res) => {
    try {  
      let tipo = req.body.tipoProducto;
      let Model;
      switch (tipo) {
        case 'Bebida':
          Model = Bebida;
          break;
        case 'Ingrediente':
          Model = Ingrediente;
          break;
        default:
          Model = Producto;
          break;
      }
      const nuevoProducto = new Model(req.body);
      await nuevoProducto.save();
      res.json({
        status: '1',
        msg: `Producto ${tipo} guardado correctamente.`
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: '0',
        msg: 'Error procesando operación.'
      });
    }
}

productoCtrl.editProducto = async (req, res) => { 
    try { 
        await Producto.updateOne({_id: req.params.id}, req.body); 
        res.json({ 
            'status': '1', 
            'msg': 'Producto actualizado.' 
        })                
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        })       
    } 
} 

productoCtrl.deleteProducto = async (req, res) => { 
    try { 
        await Producto.deleteOne({_id: req.params.id}); 
        res.json({ 
            status: '1', 
            msg: 'Producto eliminado' 
        })    
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        })   
    } 
}

productoCtrl.getIngredientes = async (req, res) => {
    const ingredientes = await Ingrediente.find();
    res.json(ingredientes);
}

productoCtrl.getBebidas = async (req, res) => {
    const bebidas = await Bebida.find();
    res.json(bebidas);
}

module.exports = productoCtrl;
