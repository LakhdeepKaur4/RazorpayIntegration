const { cardValidator } = require('../helpers/cardValidator');
const httpStatus = require('http-status');
const Card = require("../models/card");

// API to check whether card is valid or not 
exports.checkValidCardNumber = async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body)
        if (!body.number && body.number == '') {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Fields missing' })
        }
        const resp = cardValidator(req.body);
        if (body.checkCard) {
            if (resp.validCardNumber) {
                return res.status(httpStatus.OK).json({ response: resp });
            } else {
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ response: "Please enter valid card details" })
            }
        } else {
            console.log(resp)
            if (resp.validCardNumber && resp.validExpiration) {
                return res.status(httpStatus.OK).json({ response: resp });
            } else {
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ response: "Please enter date in MM/DD format" })
            }
        }

    } catch (error) {
        console.log(error)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error)
    }
}

// API to save card data
exports.saveCardData = async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body)
        if (!body.number && !body.expiration && body.holder) {
            res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Fields missing' })
        }
        // req.body.user = req.profile;
        const card = new Card(body);
        card.save((error, data) => {
            if (error) {
                console.log(error);
                return res.status(httpStatus.BAD_REQUEST).json({
                    message: "Error in saving card detail"
                });
            }
            res.status(httpStatus.OK).json(data);
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
    }
}

// API to get card data
exports.listCard = (req, res) => {
    Card.find({ user: req.params.userId, isActive: true })
        .sort("-created")
        .exec((err, cards) => {
            if (err) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    message: "Error in getting card detail"
                });;
            }
            res.json(cards);
        });
};

// API to update card data
exports.updateCard = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: req.body },
        (err, card) => {
            if (err) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    message: "Error in updating card detail"
                });
            }
            res.status(httpStatus.OK).json({ message: "Card updated successfully" });
        }
    );
};


// API to delete existing card data
exports.deleteCard = (req, res) => {
    Card.update(
        { _id: req.params.cardId },
        { $set: { isActive: false } },
        (err, card) => {
            if (err) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    message: "Error in deleting card detail"
                });
            }
            res.status(httpStatus.OK).json({ message: "Card deleted successfully" });
        }
    );
}






