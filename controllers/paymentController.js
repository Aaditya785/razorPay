import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
    currency: "INR",
  };

  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {

  // console.log(req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest('hex');
  console.log("sig received", razorpay_signature);
  console.log("sig generated", expectedSignature);

  const isAuthenticate = razorpay_signature === expectedSignature;

  if (isAuthenticate) {
    //database stuff
    await Payment.create({ razorpay_payment_id, razorpay_order_id, razorpay_signature });
    res.redirect(`https://razor-frontend.vercel.app/paymentSuccessfull?reference=${razorpay_payment_id}`);
    // res.redirect(`http://localhost:3000/paymentSuccessfull?reference=${razorpay_payment_id}`);
  }
  else {
    res.status(200).json({
      success: true,
    });
  }

}; 