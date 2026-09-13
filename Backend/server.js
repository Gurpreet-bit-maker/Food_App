import express from "express";
import connectDB from "./config/connection.js";
import Order from "./models/orderSchema.js";
import User from "./models/userSchema.js";
import jwt from "jsonwebtoken";
// middleware
import authMiddleware from "./middleware/tokenMiddleware.js";

const app = express();
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth
app.post("/api/user/logout", authMiddleware, async (req, res) => {
  try {
    await RefreshToken.deleteMany({
      userId: req.user.userId,
    });

    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
});

//! token jwt create
app.post("/api/user/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email)
      return res.json({ message: "enter name or password" });

    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "user not found" });
    console.log(user);

    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    return res.status(201).json({
      message: "login successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/api/user/singup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    return res.status(201).json({
      message: "Signup successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Signup failed",
    });
  }
});

// orders
// POST - Create New Order
app.post("/api/user/buy-order", authMiddleware, async (req, res) => {
  try {
    const {
      itemName,
      itemPrice,
      quantity,
      spicy,
      toppings,
      toppingsPrice,
      totalToppings,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      user: req.user.userId,

      itemName,
      itemPrice,
      quantity,
      spicy,
      toppings,
      toppingsPrice,
      totalToppings,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: order,
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

app.get("/api/get-orders", authMiddleware, async (req, res) => {
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
//! deshboard
app.get("/api/admin/deshboard", authMiddleware, async (req, res) => {
  try {
    const [users, totalOrders] = await Promise.all([
      User.aggregate([{ $match: { role: "user" } }, { $count: "totalUsers" }]),

      Order.aggregate([{ $count: "totalOrders" }]),
    ]);

    return res.json({ totalUsers: users, totalOrders: totalOrders });
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log("listing server on 8080 port...");
});
