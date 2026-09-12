import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },

    itemPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    spicy: {
      type: Number,
      required: true,
    },

    toppings: [
      {
        id: Number,
        name: String,
        price: Number,
      },
    ],

    toppingsPrice: {
      type: Number,
      default: 0,
    },

    totalToppings: {
      type: Number,
      default: 0,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
