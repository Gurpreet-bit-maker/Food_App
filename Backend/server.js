import express from "express";
import connectDB from "./config/connection.js";
import Order from "./models/orderSchema.js";
import User from "./models/userSchema.js";

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth
app.get("/api/user/logout", async (req, res) => {
  try {
    const user = await User.findOne({});
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/user/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email)
      return res.json({ message: "enter name or password" });

    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "user not found" });
    console.log(user);
    return res.status(201).json({ message: "login successfully" });
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/user/singup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
});

// orders
// POST - Create New Order
app.post("/api/user/buy-order", async (req, res) => {
  try {
    console.log(req.body);
    const newOrder = await Order.create(req.body);

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

//* admin routes
app.post("/api/admin/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email)
      return res.json({ message: "enter name or password" });
    console.log("data pass");
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "admin not found" });

    if (user.role == "admin" && user.password == password) {
      return res.status(201).json({ message: "admin successfully login" });
    }

    return res.status(401).json({ message: "unauthorized admin" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("listing server on 8080 port...");
});
