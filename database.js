const mongoose = require('mongoose'); 
const URI = 'mongodb+srv://grupo09:grupo09@cluster0.7s8b20u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(URI) 
    .then(db=>console.log('DB is connected')) 
    .catch(err=>console.error(err)) 
module.exports = mongoose;