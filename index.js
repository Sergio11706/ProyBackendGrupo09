const express = require('express'); 
const cors = require('cors'); 
const {mongoose} = require('./database'); 
 
var app = express(); 
 
// Middlewares 
app.use(express.json()); 
app.use(cors({origin: 'http://localhost:4200'})); 
 
// Cargar módulos de rutas 
app.use('/api/agente', require('./routes/agente.route.js')); 

// Configuración del servidor 
app.set('port', process.env.PORT || 3000); 
 
// Iniciar el servidor 
app.listen(app.get('port'), () => { 
    console.log(`Server started on port`, app.get('port')); 
});
