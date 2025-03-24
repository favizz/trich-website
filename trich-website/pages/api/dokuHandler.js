import Midtrans from "midtrans-client";

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY,
});

export default async function handler(req, res) {
  const reqBody = req.body;

  try {
    const token = await snap.createTransactionToken(reqBody);

    return res.json({
      token,
    });
  } catch (error) {
    console.error("Error occurred while creating transaction:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
