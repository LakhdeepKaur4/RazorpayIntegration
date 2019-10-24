const Transaction = require("../models/transaction");
const httpStatus = require('http-status')
const crypto = require('crypto');

exports.saveTransaction = async (req, res) => {
    console.log("CREATE Transaction: ", req.body);
    const transaction = new Transaction(req.body);
    transaction.save((error, data) => {
        if (error) {
            console.log(error)
            return res.status(400).json({
                message: "Error while saving transaction"
            });
        }
        const generated_signature = data.razorpay_order_id + "|" + data.razorpay_payment_id + ',' + process.env.RAZORPAY_API_SECRET;
        console.log("****", generated_signature);
        console.log("****", data.razorpay_signature);
        // generated_signature = hmac_sha256(data.razorpay_order_id + "|" + data.razorpay_payment_id, process.env.RAZORPAY_API_SECRET);
        crypto.createHmac('sha1', 'abcdeg').update(generated_signature).digest('hex');
        if (generated_signature == data.razorpay_signature) {
            res.status(httpStatus.OK).json({ data, message: "Payment successfully done" })
        } else {
            res.status(httpStatus.OK).json({ data, message: "Payment Failed" })
        }
    });
};


