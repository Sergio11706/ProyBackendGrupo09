const express = require('express');
const mpCtrl = require('../controllers/mp.controller');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');


router.post('/payment', authCtrl.verifyToken, mpCtrl.getPaymentlink);
router.post('/subscription', authCtrl.verifyToken, mpCtrl.getSubscriptionLink);

module.exports = router;