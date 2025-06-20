const mongoose = require('mongoose'); 

const {Schema} = mongoose; 

const AgenteSchema = new Schema({ 
    legajo: {type: Number, required: true}, 
    apellido: {type: String, required: true}, 
    nombre: {type:String, required: true}, 
    nro_documento: {type:String, required:true}, 
    estado: {type: Boolean, required: true} 
}) 
 
module.exports = mongoose.models.Agente || mongoose.model('Agente', AgenteSchema); 