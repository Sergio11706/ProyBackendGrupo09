const axios = require("axios");
const mpCtrl = {};

mpCtrl.getPaymentlink = async (req, res) => {
  try {
    const url = "https://api.mercadopago.com/checkout/preferences";
    const { payer_email, title, description, unit_price, quantity } = req.body;

    const body = {
      payer_email,
      items: [{
        title,
        description,
        quantity,
        unit_price,
        currency_id: "ARS"
      }],
      back_urls: {
        failure: "http://localhost:4200/pago/fallido",
        pending: "http://localhost:4200/pago/pendiente",
        success: "http://localhost:4200/pago/exitoso"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return res.status(200).json(payment.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Error al generar link de pago" });
  }
};

mpCtrl.getSubscriptionLink = async (req, res) => {
  try {
    const url = "https://api.mercadopago.com/preapproval";
    const { payer_email, amount } = req.body;

    const body = {
      reason: "Suscripción mensual",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: amount,
        currency_id: "ARS"
      },
      back_url: "http://localhost:4200/pago/exitoso",
      payer_email
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return res.status(200).json(subscription.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, msg: "Error al crear suscripción" });
  }
};

module.exports = mpCtrl; 