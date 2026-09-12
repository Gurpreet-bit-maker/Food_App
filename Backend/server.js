import express from "express";
import connectDB from "./config/connection.js";
import Order from "./models/orderSchema.js";

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST - Create New Order
app.post("/api/orders", async (req, res) => {
  try {
    const orderData = req.body;
    console.log(req.body);
    const newOrder = await Order.create(orderData);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
});

app.get("/api/get-orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});

app.listen(8080, () => {
  console.log("listing server on 8080 port...");
});
