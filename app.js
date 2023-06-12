import express from 'express';
import cors from "cors";
import { config } from 'dotenv';
import payment_routes from './routers/payment_routes.js';


config({ path: "./config/config.env" });
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/",(req, res)=>res.send('<h1>some html</h1>'));
app.use("/api", payment_routes);
app.get("/api/getkey", (req,res)=>res.status(200).json({key: process.env.RAZORPAY_API_KEY}))

export default app;
