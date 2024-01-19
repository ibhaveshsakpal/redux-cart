const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 4000;
const cors = require("cors");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET);

app.use(cors());
app.use(bodyParser.json());

app.post("/api/create-checkout-session", async (req, res) => {
  const { product } = req.body;
  if (!stripe) {
    res.json({ message: "Invalid Stripe Secret" }).status(400);
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      },
    ],
    mode: "payment",
    success_url: product.redirect_to,
    cancel_url: "http://localhost:3000/",
  });

  res.json({ id: session.id, clientSecret: session.client_secret });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
