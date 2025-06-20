const razorpay = require("../../helpers/razorpay"); // Ensure Razorpay instance is configured in helpers
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    // Razorpay expects amount in paise, so multiply by 100
    const razorpayOptions = {
      amount: totalAmount * 100, // Convert to paise for INR
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(razorpayOptions);

    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus: "pending",
      totalAmount,
      orderDate,
      orderUpdateDate,
      razorpayOrderId: razorpayOrder.id,
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount, // Returning in rupees
      currencySymbol: "₹",
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error while creating Razorpay order",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { razorpayPaymentId, razorpayOrderId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order || order.razorpayOrderId !== razorpayOrderId) {
      return res.status(404).json({
        success: false,
        message: "Order not found or invalid Razorpay Order ID",
      });
    }

    // Verify the payment is legitimate
    const verifyPayment = await razorpay.payments.fetch(razorpayPaymentId);
    
    if (verifyPayment.order_id !== razorpayOrderId || verifyPayment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = razorpayPaymentId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
