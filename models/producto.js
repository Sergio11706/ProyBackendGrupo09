const mongoose = require('mongoose'); 

const {Schema} = mongoose; 

const ProductoSchema = new Schema({ 
    nombre: {type: String, required: true},
    unidadMedida: {type: String, required: true}, 
    stock: {type: Number, required:true}, 
    precioUnitario: {type: Number, required: true},
    vencimiento: {type: Date, required: true},
    disponible: {type: Boolean, required: true},
    imagen: {type: String, required: false},
}, {discriminatorKey: 'tipoProducto', collection: 'productos' }) 
 
const Producto = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);


const BebidaSchema = new Schema({ 
    volumen: {type: Number, required: true},
    tipoBebida: {type: String, required: true}
});

const Bebida = Producto.discriminator('Bebida', BebidaSchema);


const IngredienteSchema = new Schema({ 
    categoria: {type: String, required: true},
    proveedor: {type: String, required: true},
});

const Ingrediente = Producto.discriminator('Ingrediente', IngredienteSchema);


module.exports = {Producto, Bebida, Ingrediente}; 