const express = require('express'); 
const cors = require('cors'); 
const {mongoose} = require('./database'); 
const dotenv = require('dotenv');
dotenv.config(); 

var app = express(); 
 
const allowOrigins = [
    'http://localhost:4200',
    'https://proyfrontendgrupo09.onrender.com'
];

// Middlewares 
app.use(express.json()); 
app.use(cors(
    {
        origin: allowOrigins,
        credentials: true
    }
)); 
 
// Cargar módulos de rutas 
app.use('/api/agente', require('./routes/agente.route.js'));
app.use('/api/pedidos', require('./routes/pedido.route.js'));
app.use('/api/facturas', require('./routes/factura.route.js'));
app.use('/api/productos', require('./routes/producto.route.js'));
app.use('/api/usuarios', require('./routes/usuario.route.js'));
app.use('/api/mp', require('./routes/mp.route.js'));

// Configuración del servidor 
app.set('port', process.env.PORT || 3000); 
 
// Iniciar el servidor 
app.listen(app.get('port'), () => { 
    console.log(`Servidor iniciado en el puerto`, app.get('port')); 
});
