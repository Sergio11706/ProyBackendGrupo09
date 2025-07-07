const axios = require("axios");
const Pedido = require('../models/pedido');
const mpCtrl = {};

mpCtrl.getPaymentlink = async (req, res) => {
  try {
    const { items, customerInfo } = req.body;
    
    console.log('Datos recibidos:', { items, customerInfo });
    
    // Crear el pedido en la base de datos
    const nuevoPedido = new Pedido({
      items: items,
      total: items.reduce((total, item) => total + (item.precio * item.cantidad), 0),
      customerInfo: customerInfo,
      status: 'pendiente',
      paymentMethod: 'mercadopago'
    });
    
    const pedidoGuardado = await nuevoPedido.save();
    
    // Formato simplificado para MercadoPago
    const preferenceData = {
      items: items.map(item => ({
        title: item.nombre,
        unit_price: Number(item.precio),
        quantity: Number(item.cantidad),
        picture_url: item.imagen || 'https://via.placeholder.com/150'
      })),
      payer: {
        name: customerInfo.nombre,
        email: customerInfo.email
      },
      back_urls: {
        success: `http://localhost:4200/pago-exitoso?pedido_id=${pedidoGuardado._id}`,
        failure: `http://localhost:4200/pago-fallido?pedido_id=${pedidoGuardado._id}`,
        pending: `http://localhost:4200/pago-pendiente?pedido_id=${pedidoGuardado._id}`
      },
      external_reference: pedidoGuardado._id.toString()
    };
    
    console.log('Datos enviados a MercadoPago:', preferenceData);
    
    const url = "https://api.mercadopago.com/checkout/preferences";
    const payment = await axios.post(url, preferenceData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
      }
    });
    
    console.log('Respuesta de MercadoPago:', payment.data);
    
    res.json({
      success: true,
      preferenceId: payment.data.id,
      initPoint: payment.data.init_point,
      pedidoId: pedidoGuardado._id
    });
    
  } catch (error) {
    console.error('Error completo:', error);
    console.error('Error response:', error.response?.data);
    res.status(500).json({
      success: false,
      message: 'Error al procesar el pago',
      error: error.message,
      details: error.response?.data
    });
  }
};

mpCtrl.getSubscriptionLink = async (req, res) => {
  // Implementación opcional para suscripciones
  res.status(501).json({ error: true, msg: "Not implemented" });
};

module.exports = mpCtrl; 