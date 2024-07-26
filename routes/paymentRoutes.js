const Router = require("express").Router();
const PaymentController = require("../controller/paymentController");

Router.post("/", PaymentController.createPayment); // http://localhost:8000/api/payment/



module.exports = Router;