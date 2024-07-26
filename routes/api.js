const express = require('express');
const router = express.Router();

/* GET users listing. */

router.use("/user",require("./userRoutes"))  // http://localhost:3000/api/user/
router.use("/puja",require("./pujaRoutes"))  // http://localhost:3000/api/puja//
router.use("/payment",require("./paymentRoutes"))  // http://localhost:3000/api/booking//



module.exports = router;

