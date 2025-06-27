const {Usuario, Administrador, Cliente, Repartidor} = require('../models/usuario'); 
const usuarioCtrl = {} 
 
usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find(); 
    res.json(usuarios);
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
  try { 
      await Usuario.deleteOne({_id: req.params.id}); 
      res.json({ 
          status: '1', 
          msg: 'Usuario eliminado' 
      })    
  } catch (error) { 
      res.status(400).json({ 
          'status': '0', 
          'msg': 'Error procesando la operacion' 
      })   
  } 
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
 
usuarioCtrl.loginUsuario = async (req, res) => { 
  const criteria = { 
      username: req.body.username, 
      password: req.body.password 
  } 

  try { 
      const user = await Usuario.findOne(criteria); 
      if (!user) { 
          res.json({ 
              status: 0, 
              msg: "not found" 
          }) 
      } else { 
          res.json({ 
              status: 1, 
              msg: "success", 
              username: user.username, 
          }) 
      } 
  } catch (error) { 
      res.json({ 
          'status': '0', 
          'msg': 'Error procesando la operacion' 
      })   
  } 
}

module.exports = usuarioCtrl;