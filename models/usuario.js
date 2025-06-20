const mongoose = require('mongoose'); 

const {Schema} = mongoose; 

const UsuarioSchema = new Schema({ 
    username: {type: String, required: true}, 
    password: {type: String, required: true}, 
    nombre: {type:String, required: true}, 
    apellido: {type:String, required:true}, 
    estado: {type: Boolean, required: true},
    email: {type: String, required: true},
    telefono: {type: String, required: true},
    activo: {type: Boolean, required: true},
}, {discriminatorKey: 'tipoUsuario', collection: 'usuarios' }) 
 
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);


const AdministradorSchema = new Schema({ 
    permisos: {type: Number, required: true},
    ultimaModificacion: {type: String, required: true}
});

const Administrador = mongoose.models.Administrador || mongoose.model('Administrador', AdministradorSchema);


const ClienteSchema = new Schema({ 
    barrio: {type: String, required: true},
    calle: {type: String, required: true},
    numeroCalle: {type: Number, required: true},
    descuento: {type: Number, required: true}
});

const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', ClienteSchema);


const RepartidorSchema = new Schema({ 
    documento: {type: String, required: true},
    numeroLicencia: {type: String, required: true},
    domicilio: {type: String, required: true},
    vehiculo: {type: String, required: true},
    zonaAsignada: {type: String, required: true},
    rating: {type: Number, required: true},
    estado: {type: Boolean, required: true}
});

const Repartidor = mongoose.models.Repartidor || mongoose.model('Repartidor', RepartidorSchema);

module.exports = {Usuario, Administrador, Cliente, Repartidor}; 