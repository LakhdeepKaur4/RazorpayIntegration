const express = require("express");
const router = express.Router();

const { createOrder, payment, createPayment, fetchPaymentIdForOrder, finalApi, getCardAssociatedWithAccount } = require("../controllers/razorpay");


router.get("/get/card/linked",
    getCardAssociatedWithAccount
)

router.post(
    "/order",
    createOrder,
);

router.post(
    "/order/makepayment",
    payment
)

router.get(
    "/order/fetch/payment",
    fetchPaymentIdForOrder
)

router.get(
    "/order",
    finalApi
)

router.get(
    "/fetch/order/payemnt/test",
    createPayment
)

module.exports = router;