const Agente = require('../models/agente'); 
const agenteCtrl = {} 
 
agenteCtrl.getAgentes = async (req, res) => { 
    var agentes = await Agente.find(); 
    res.json(agentes); 
} 
 
agenteCtrl.createAgente = async (req, res) => { 
    var agente = new Agente(req.body); 
    try { 
        await agente.save(); 
        res.json({ 
            'status': '1', 
            'msg': 'Agente guardado.'}) 
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando operacion.'}) 
    } 
 
} 
 
agenteCtrl.getAgente = async (req, res) => { 
    const agente = await Agente.findById(req.params.id); 
    res.json(agente); 
} 
 
agenteCtrl.editAgente = async (req, res) => { 
    const vagente =  new Agente(req.body); 
    try { 
        await Agente.updateOne({_id: req.body._id}, vagente); 
        res.json({ 
            'status': '1', 
            'msg': 'Agente updated' 
        })         
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        })       
    } 
} 
 
agenteCtrl.deleteAgente = async (req, res)=>{ 
    try { 
        await Agente.deleteOne({_id: req.params.id}); 
        res.json({ 
            status: '1', 
            msg: 'Agente removed' 
        })    
    } catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        })   
    } 
} 
 
module.exports = agenteCtrl;