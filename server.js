const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');

const stripe = Stripe('sk_test_51PvJlxEaYo4sADHi6LNmI1LmLYtoKqBId8WNJ3boypeopnjpONUrS7jVRHNIM1EORGyhr6K1fdXKxEYTJNUs3Exf00obBwOAur');
const app = express();

app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, 
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
