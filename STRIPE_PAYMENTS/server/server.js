require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { Stripe } = require('stripe');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    allowedHeaders: '*',
  })
);

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 10000, name: 'Learn React Today' }],
  [2, { priceInCents: 20000, name: 'Learn CSS Today' }],
  [3, { priceInCents: 85000, name: 'IPhone 17' }],
  [4, { priceInCents: 15000, name: 'TV SAMSUNG' }],
]);

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;

  const line_items = items.map((item) => {
    const storeItem = storeItems.get(item.id);
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: storeItem.name,
        },
        unit_amount: storeItem.priceInCents,
      },
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: 'http://127.0.0.1:5500/client/success.html',
      cancel_url: 'http://127.0.0.1:5500/client/cancel.html',
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3333, () => console.log('server is runnig'));
