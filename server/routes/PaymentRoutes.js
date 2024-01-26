const express = require('express');
const router = express.Router();
require('dotenv').config({ "path": "../.env" });
const User = require('../model/User.model.js');
const path = require('path');

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

/*
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.APP_PASSWORD
    }
});
*/


router.post("/create/checkout/session", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            customer_email: user.email,
            line_items: [
                {
                    price: 'price_1OcJAuBLmOHjf4IgNBzNQu5A',
                    quantity: 1,
                }
            ],
            success_url: `${process.env.CLIENT_URL}/`,
            cancel_url: `${process.env.CLIENT_URL}/`
        })

        res.json({ url: session.url })
    } catch(e) {
        res.status(500).json({ error: e.message })
    }
})

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event = req.body;

    switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntentSucceeded = event.data.object;
          break;

        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          const checkoutEmail = checkoutSessionCompleted.customer_details.email;
          const user = await User.findOne({ email: checkoutEmail });

          user.premium = true;
          user.save();

          const sessionId = event.data.object.id;
          
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});


module.exports = router;