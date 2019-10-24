const express = require("express");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { checkValidCardNumber, saveCardData, listCard, deleteCard } = require("../controllers/card");

router.post("/validate/card", checkValidCardNumber);

router.post("/save/card/data", saveCardData);

router.get("/card/:userId", listCard);

router.put("/card/delete/:cardId", deleteCard);

module.exports = router;
