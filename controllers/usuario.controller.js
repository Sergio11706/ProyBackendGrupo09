const {Usuario, Administrador, Cliente, Repartidor} = require('../models/usuario'); 
const usuarioCtrl = {} 
 
usuarioCtrl.getUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find(); 
      res.json(usuarios);
    } catch (error) {
      res.status(400).json({ msg: 'Error al obtener los usuarios' });
    }
}
 
 
usuarioCtrl.createUsuario = async (req, res) => {
    try {  
      let tipo = req.body.tipoUsuario;
      let Model;
      switch (tipo) {
        case 'Cliente':
          Model = Cliente;
          break;
        case 'Administrador':
          Model = Administrador;
          break;
        case 'Repartidor':
          Model = Repartidor;
          break;
        default:
          Model = Usuario;
          break;
      }
      const nuevoUsuario = new Model(req.body);
      await nuevoUsuario.save();
      res.json({
        status: '1',
        msg: `Usuario ${tipo} guardado correctamente.`
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: '0',
        msg: 'Error procesando operación.'
      });
    }
}
  

usuarioCtrl.deleteUsuario = async (req, res) => { 
    const usuario = await Usuario.findByIdAndDelete(req.params.id); 
    res.json(usuario); 
}

usuarioCtrl.editUsuario = async (req, res) => { 
    try { 
        await Usuario.updateOne({_id: req.params.id}, req.body); 
        res.json({ 
            'status': '1', 
            'msg': 'Usuario actualizado.' 
        })                
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        })       
    } 
} 

usuarioCtrl.getAdministrador = async (req, res) => { 
    const administrador = await Administrador.findById(req.params.id); 
    res.json(administrador); 
}

usuarioCtrl.getRepartidores = async (req, res) => { 
    var repartidores = await Repartidor.find(); 
    res.json(repartidores); 
}

usuarioCtrl.getRepartidor = async (req, res) => { 
    const repartidor = await Repartidor.findById(req.params.id); 
    res.json(repartidor); 
}

usuarioCtrl.getCliente = async (req, res) => { 
    const cliente = await Cliente.findById(req.params.id); 
    res.json(cliente); 
}
 

module.exports = usuarioCtrl;