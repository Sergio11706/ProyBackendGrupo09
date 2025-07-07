const { MercadoPagoConfig, Preference } = require('mercadopago');
const Pedido = require('../models/pedido');
require('dotenv').config();

// Configurar Mercado Pago con la nueva sintaxis
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'APP_USR-5195495475501203-070115-61f90b45b1eefb373946d199e5b6312e-1313530013'
});

// Crear preferencia de pago
exports.crearPreferencia = async (req, res) => {
    try {
        const { items, customerInfo } = req.body;
        
        // Crear el pedido en la base de datos
        const nuevoPedido = new Pedido({
            items: items,
            total: items.reduce((total, item) => total + (item.precio * item.cantidad), 0),
            customerInfo: customerInfo,
            status: 'pendiente',
            paymentMethod: 'mercadopago'
        });
        
        const pedidoGuardado = await nuevoPedido.save();
        
        // Crear preferencia de Mercado Pago con la nueva sintaxis
        const preference = new Preference(client);
        
        const preferenceData = {
            items: items.map(item => ({
                title: item.nombre,
                unit_price: item.precio,
                quantity: item.cantidad,
                picture_url: item.imagen
            })),
            payer: {
                name: customerInfo.nombre,
                email: customerInfo.email,
                phone: {
                    number: customerInfo.telefono
                },
                address: {
                    street_name: customerInfo.direccion,
                    zip_code: customerInfo.codigoPostal || '0000'
                }
            },
            back_urls: {
                success: `http://localhost:4200/pago-exitoso?pedido_id=${pedidoGuardado._id}`,
                failure: `http://localhost:4200/pago-fallido?pedido_id=${pedidoGuardado._id}`,
                pending: `http://localhost:4200/pago-pendiente?pedido_id=${pedidoGuardado._id}`
            },
            auto_return: 'approved',
            external_reference: pedidoGuardado._id.toString(),
            notification_url: 'http://localhost:3000/api/pagos/webhook',
            expires: true,
            expiration_date_from: new Date().toISOString(),
            expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 horas
        };

        const response = await preference.create({ body: preferenceData });
        
        res.json({
            success: true,
            preferenceId: response.id,
            initPoint: response.init_point,
            pedidoId: pedidoGuardado._id
        });
        
    } catch (error) {
        console.error('Error al crear preferencia de pago:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al procesar el pago',
            error: error.message 
        });
    }
};

// Webhook para recibir notificaciones de Mercado Pago
exports.webhook = async (req, res) => {
    try {
        const { type, data } = req.body;
        
        if (type === 'payment') {
            const { Payment } = require('mercadopago');
            const payment = new Payment(client);
            const paymentInfo = await payment.get({ paymentId: data.id });
            const pedidoId = paymentInfo.external_reference;
            
            // Actualizar estado del pedido
            const pedido = await Pedido.findById(pedidoId);
            if (pedido) {
                switch (paymentInfo.status) {
                    case 'approved':
                        pedido.status = 'pagado';
                        pedido.paymentId = paymentInfo.id;
                        break;
                    case 'rejected':
                        pedido.status = 'rechazado';
                        break;
                    case 'pending':
                        pedido.status = 'pendiente';
                        break;
                    case 'in_process':
                        pedido.status = 'en_proceso';
                        break;
                }
                await pedido.save();
            }
        }
        
        res.status(200).json({ received: true });
    } catch (error) {
        console.error('Error en webhook:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener información de un pago
exports.getPaymentInfo = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const { Payment } = require('mercadopago');
        const payment = new Payment(client);
        const paymentInfo = await payment.get({ paymentId });
        
        res.json({
            success: true,
            payment: paymentInfo
        });
    } catch (error) {
        console.error('Error al obtener información del pago:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener información del pago' 
        });
    }
};

// Obtener estado de un pedido
exports.getPedidoStatus = async (req, res) => {
    try {
        const { pedidoId } = req.params;
        const pedido = await Pedido.findById(pedidoId);
        
        if (!pedido) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pedido no encontrado' 
            });
        }
        
        res.json({
            success: true,
            pedido: pedido
        });
    } catch (error) {
        console.error('Error al obtener estado del pedido:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener estado del pedido' 
        });
    }
}; 