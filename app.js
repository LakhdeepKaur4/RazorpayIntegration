const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const razorpayRoutes = require("./routes/razorpay");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");
const cardRoutes = require("./routes/card");
const transactionRoutes = require('./routes/transaction')

// app
const app = express();

// app.get('/*', function (req, res) {
//     res.sendFile('index.html', {root: path.join(__dirname, 'public')});
// });

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB Connected"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);
app.use("/api", razorpayRoutes);
app.use("/api", cardRoutes);
app.use("/api", transactionRoutes);



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
