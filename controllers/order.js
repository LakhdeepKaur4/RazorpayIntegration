const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Razorpay = require('razorpay');

var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};


exports.create = async (req, res) => {
    console.log("CREATE ORDER: ", req.body);
    req.body.order.user = req.profile;
    //generating random number for receipt
    const receiptRandomNumber = Math.floor(Math.random() * 90000) + 10000;
    //object to be send to razorpay
    var orderData = {
        amount: req.body.order.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: `order_rcptid_${receiptRandomNumber}`,
        payment_capture: '1'
    };
    //calling razorpay order api
    const response = await razorpay.orders.create(orderData);
    req.body.order.razorpay_order_id = response.id;
    req.body.order.receipt = response.receipt;
    req.body.order.entity = response.entity;
    req.body.order.currency = response.currency;
    req.body.order.razorpay_order_status = response.status;
    req.body.order.attempts = response.attempts;
    req.body.order.razorpay_createdAt = response.createdAt;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name address")
        .sort("-created")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(order);
        }
    );
};
