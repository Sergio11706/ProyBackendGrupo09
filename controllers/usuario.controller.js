const {Usuario, Administrador, Cliente, Repartidor} = require('../models/usuario'); 
const usuarioCtrl = {} 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');    

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

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;

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
      // Primero obtenemos el usuario para determinar su tipo
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) {
          return res.status(404).json({ 
              status: '0', 
              msg: 'Usuario no encontrado' 
          });
      }

      // Actualizamos el usuario según su tipo
      let modelo;
      switch (usuario.tipoUsuario) {
          case 'Cliente':
              modelo = Cliente;
              break;
          case 'Administrador':
              modelo = Administrador;
              break;
          case 'Repartidor':
              modelo = Repartidor;
              break;
          default:
              modelo = Usuario;
      }


      // Actualizamos el documento usando el modelo correcto
      await modelo.findByIdAndUpdate(
          req.params.id, 
          { $set: req.body }, 
          { new: true, runValidators: true }
      );

      res.json({ 
          status: '1', 
          msg: 'Usuario actualizado correctamente.' 
      });                
  } catch (error) { 
      console.error('Error al actualizar usuario:', error);
      res.status(400).json({ 
          status: '0', 
          msg: 'Error procesando la operación',
          error: error.message
      });       
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
    try {
        const user = await Usuario.findOne({ username: req.body.username });
        if (!user) {
          return res.json({ status: 0, msg: "Usuario no encontrado" });
        }
    
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          return res.json({ status: 0, msg: "Contraseña incorrecta" });
        }
    
        const unToken = jwt.sign({ id: user._id }, "secretkey");
        res.json({
          status: 1,
          msg: "success",
          username: user.username,
          tipoUsuario: user.tipoUsuario,
          estado: user.estado,
          _id: user._id,
          token: unToken,
          permisos: user.permisos,
          tienePedido: user.tienePedido
        });
      } catch (error) {
        res.json({
          status: '0',
          msg: 'Error procesando la operación'
        });
    }
}

usuarioCtrl.aceptarSolicitud = async (req, res) => { 
    try { 
        await Repartidor.updateOne({_id: req.params.id}, {estado: 'aprobado'}); 
        res.json({ 
            'status': '1', 
            'msg': 'Solicitud aprobada.' 
        })                
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        })       
    } 
}

usuarioCtrl.rechazarSolicitud = async (req, res) => { 
    try { 
        await Repartidor.updateOne({_id: req.params.id}, {estado: 'rechazado'}); 
        res.json({ 
            'status': '1', 
            'msg': 'Solicitud rechazada.' 
        })                
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        })       
    } 
}

usuarioCtrl.getUsuariosPorMes = async (req, res) => {
    try {
        const resultado = await Usuario.aggregate([
          {
            $group: {
              _id: { $month: "$createdAt" },
              cantidad: { $sum: 1 }
            }
          },
          {
            $sort: { "_id": 1 }
          }
        ]);
    
        const meses = [
          "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
    
        const datos = resultado.map(r => ({
          mes: meses[r._id],
          cantidad: r.cantidad
        }));
    
        res.json(datos);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Error al obtener usuarios por mes' });
    }
}

module.exports = usuarioCtrl;