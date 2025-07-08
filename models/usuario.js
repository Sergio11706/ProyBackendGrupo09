const mongoose = require('mongoose'); 

const {Schema} = mongoose; 

const UsuarioSchema = new Schema({ 
    username: {type: String, required: true}, 
    password: {type: String, required: true}, 
    nombre: {type:String, required: true}, 
    apellido: {type:String, required:true}, 
    email: {type: String, required: true},
    telefono: {type: String, required: true},
}, {discriminatorKey: 'tipoUsuario', collection: 'usuarios', timestamps: true }) 
 
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);


const AdministradorSchema = new Schema({ 
    permisos: {type: Number, required: true},
    ultimaModificacion: {type: String, required: false}
});

const Administrador = Usuario.discriminator('Administrador', AdministradorSchema);


const ClienteSchema = new Schema({ 
    barrio: {type: String, required: true},
    calle: {type: String, required: true},
    numeroCalle: {type: Number, required: true},
    tienePedido: {type: Boolean, required: true},
    descuento: {type: Number, required: true},
});

const Cliente = Usuario.discriminator('Cliente', ClienteSchema);


const RepartidorSchema = new Schema({ 
    documento: {type: String, required: true},
    numeroLicencia: {type: String, required: true},
    vehiculo: {type: String, required: true},
    zonaTrabajo: {type: String, required: true},
    rating: {type: Number, required: true},
    estado: {
        type: String,
        enum: ['aprobado', 'pendiente', 'rechazado'],
        default: 'pendiente',
        required: true
    },
});

const Repartidor = Usuario.discriminator('Repartidor', RepartidorSchema);

module.exports = {Usuario, Administrador, Cliente, Repartidor}; 