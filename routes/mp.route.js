const express = require('express');
const mpCtrl = require('../controllers/mp.controller');
const router = express.Router();

router.post('/payment', mpCtrl.getPaymentlink);
router.post('/subscription', mpCtrl.getSubscriptionLink);

module.exports = router; 