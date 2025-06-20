const {Usuario, Administrador, Cliente, Repartidor} = require('../models/usuario'); 
const usuarioCtrl = {} 
 
usuarioCtrl.getUsuarios = async (req, res) => { 
    var usuarios = await Usuario.find(); 
    res.json(usuarios); 
} 
 
usuarioCtrl.createUsuario = async (req, res) => { 
    var usuario = new Usuario(req.body); 
    try { 
        await usuario.save(); 
        res.json({ 
            'status': '1', 
            'msg': 'Usuario guardado.'}) 
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando operacion.'}) 
    } 
 
} 

usuarioCtrl.deleteUsuario = async (req, res) => { 
    const usuario = await Usuario.findByIdAndDelete(req.params.id); 
    res.json(usuario); 
}

usuarioCtrl.editUsuario = async (req, res) => { 
    const vusuario =  new Usuario(req.body); 
    try { 
        await Usuario.updateOne({_id: req.body._id}, vusuario); 
        res.json({ 
            'status': '1', 
            'msg': 'Usuario updated' 
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