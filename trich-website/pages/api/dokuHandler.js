import Midtrans from "midtrans-client";

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

export default async function handler(req, res) {
  const { id, productName, price, quantity, customer } = req.body;

  let parameter = {
    transaction_details: {
      order_id: `SgOrder-${getRandomNumber()}`,
      gross_amount: 10000,
    },
    item_details: [
      {
        name: "Apple",
        price: 7000,
        quantity: 1,
        id: "SKU-01",
      },
      {
        name: "Orange",
        price: 3000,
        quantity: 1,
        id: "SKU-02",
      },
    ],
    customer_details: {
      first_name: "Raizan Iqbal",
      email: "raizan.iqbal@gmail.com",
    },
    enabled_payments: [
      "other_qris", 
    ],
  };

  try {
    const token = await snap.createTransactionToken(parameter);

    return res.json({
      token,
    });
  } catch (error) {
    console.error("Error occurred while creating transaction:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
