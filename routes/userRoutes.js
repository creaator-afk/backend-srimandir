const router = require("express").Router();
const UserController = require("../controller/userController");

router.post("/signUp", UserController.createUser);
router.post("/signIn", UserController.signIn);
router.get("/auth", UserController.checkToken);

module.exports = router;