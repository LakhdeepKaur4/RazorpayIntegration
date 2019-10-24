const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cardSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
            maxlength: 16,
            unique: true
        },
        holder: {
            type: String,
            trim: true,
            required: true,
        },
        expiration: {
            type: String,
        },
        user: { type: ObjectId, ref: "User" },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("Card", cardSchema);
