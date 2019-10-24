const express = require("express");
const router = express.Router();
const { saveTransaction } = require("../controllers/transaction");

router.post("/transaction", saveTransaction);

module.exports = router;