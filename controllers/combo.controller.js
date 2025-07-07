const Combo = require('../models/combo');

// Obtener todos los combos
exports.getCombos = async (req, res) => {
    try {
        const combos = await Combo.find({ disponible: true }).sort({ fechaCreacion: -1 });
        res.json(combos);
    } catch (error) {
        console.error('Error al obtener combos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener un combo por ID
exports.getComboById = async (req, res) => {
    try {
        const combo = await Combo.findById(req.params.id);
        if (!combo) {
            return res.status(404).json({ message: 'Combo no encontrado' });
        }
        res.json(combo);
    } catch (error) {
        console.error('Error al obtener combo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo combo
exports.createCombo = async (req, res) => {
    try {
        const nuevoCombo = new Combo(req.body);
        const comboGuardado = await nuevoCombo.save();
        res.status(201).json(comboGuardado);
    } catch (error) {
        console.error('Error al crear combo:', error);
        res.status(400).json({ message: 'Error al crear combo', error: error.message });
    }
};

// Actualizar un combo
exports.updateCombo = async (req, res) => {
    try {
        const comboActualizado = await Combo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!comboActualizado) {
            return res.status(404).json({ message: 'Combo no encontrado' });
        }
        res.json(comboActualizado);
    } catch (error) {
        console.error('Error al actualizar combo:', error);
        res.status(400).json({ message: 'Error al actualizar combo', error: error.message });
    }
};

// Eliminar un combo (marcar como no disponible)
exports.deleteCombo = async (req, res) => {
    try {
        const combo = await Combo.findByIdAndUpdate(
            req.params.id,
            { disponible: false },
            { new: true }
        );
        if (!combo) {
            return res.status(404).json({ message: 'Combo no encontrado' });
        }
        res.json({ message: 'Combo eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar combo:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener combos por categoría
exports.getCombosByCategoria = async (req, res) => {
    try {
        const combos = await Combo.find({ 
            categoria: req.params.categoria,
            disponible: true 
        }).sort({ fechaCreacion: -1 });
        res.json(combos);
    } catch (error) {
        console.error('Error al obtener combos por categoría:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Inicializar combos de ejemplo
exports.initializeCombos = async (req, res) => {
    try {
        const combosEjemplo = [
            {
                nombre: 'Combo Clásico',
                descripcion: 'Hamburguesa con queso, papas fritas y gaseosa',
                precio: 2500,
                imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
                componentes: ['Hamburguesa con queso', 'Papas fritas', 'Gaseosa'],
                disponible: true,
                categoria: 'Clásicos'
            },
            {
                nombre: 'Combo Doble',
                descripcion: 'Doble hamburguesa, papas fritas grandes y gaseosa',
                precio: 3200,
                imagen: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
                componentes: ['Doble hamburguesa', 'Papas fritas grandes', 'Gaseosa'],
                disponible: true,
                categoria: 'Especiales'
            },
            {
                nombre: 'Combo Vegetariano',
                descripcion: 'Hamburguesa vegetariana, ensalada y jugo natural',
                precio: 2800,
                imagen: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
                componentes: ['Hamburguesa vegetariana', 'Ensalada fresca', 'Jugo natural'],
                disponible: true,
                categoria: 'Vegetariano'
            },
            {
                nombre: 'Combo Familiar',
                descripcion: '4 hamburguesas, 2 papas fritas grandes y 4 gaseosas',
                precio: 8500,
                imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
                componentes: ['4 Hamburguesas', '2 Papas fritas grandes', '4 Gaseosas'],
                disponible: true,
                categoria: 'Familiar'
            },
            {
                nombre: 'Combo Premium',
                descripcion: 'Hamburguesa gourmet, papas especiales y cerveza artesanal',
                precio: 4200,
                imagen: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400',
                componentes: ['Hamburguesa gourmet', 'Papas especiales', 'Cerveza artesanal'],
                disponible: true,
                categoria: 'Premium'
            },
            {
                nombre: 'Combo Rápido',
                descripcion: 'Hamburguesa simple, papas pequeñas y gaseosa',
                precio: 1800,
                imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
                componentes: ['Hamburguesa simple', 'Papas pequeñas', 'Gaseosa'],
                disponible: true,
                categoria: 'Económico'
            }
        ];

        // Eliminar combos existentes
        await Combo.deleteMany({});
        
        // Insertar combos de ejemplo
        const combosCreados = await Combo.insertMany(combosEjemplo);
        
        res.json({ 
            message: 'Combos inicializados exitosamente', 
            count: combosCreados.length,
            combos: combosCreados
        });
    } catch (error) {
        console.error('Error al inicializar combos:', error);
        res.status(500).json({ message: 'Error al inicializar combos', error: error.message });
    }
}; 