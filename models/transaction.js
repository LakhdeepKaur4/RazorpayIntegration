const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const transactionSchema = new mongoose.Schema(
    {
        amount: { type: Number },
        address: String,
        attempts: { type: Number },
        updated: Date,
        entity: String,
        razorpay_order_id: String,
        razorpay_payment_id: String,
        razorpay_signature: String,
        razorpay_createdAt: Date,
        user: { type: ObjectId, ref: "User" },
        entity: {
            type: String,
            default: 'payment'
        },
        amount: {
            type: Number
        },
        currency: { type: String },
        status: { type: String },
        method: { type: String },
        description: { type: String },
        amount_refunded: { type: Number },
        refund_status: { type: String },
        email: { type: String },
        contact: { type: Number },
        notes: { type: ObjectId },
        fees: { type: Number },
        tax: { type: Number },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
