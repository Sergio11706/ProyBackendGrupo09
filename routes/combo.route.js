const express = require('express');
const router = express.Router();
const comboController = require('../controllers/combo.controller');

// Obtener todos los combos
router.get('/', comboController.getCombos);

// Obtener un combo por ID
router.get('/:id', comboController.getComboById);

// Crear un nuevo combo
router.post('/', comboController.createCombo);

// Actualizar un combo
router.put('/:id', comboController.updateCombo);

// Eliminar un combo
router.delete('/:id', comboController.deleteCombo);

// Obtener combos por categoría
router.get('/categoria/:categoria', comboController.getCombosByCategoria);

// Inicializar combos de ejemplo
router.post('/initialize', comboController.initializeCombos);

module.exports = router; 