
require('dotenv').config();
const CONFIG = require('../config');
const stripe = require('stripe')(CONFIG.STRIPE_SECRET_KEY);

function PaymentController() {}

PaymentController.createPayment = async  (req, res) => {
    const {amount} = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    }catch (error) {
        res.status(500).send({error: error.message});
    }
}

module.exports = PaymentController;
