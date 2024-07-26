const Router = require("express").Router();
const PujaController = require("../controller/pujaController");

Router.post("/", PujaController.createPuja);
Router.delete("/:id", PujaController.deletePuja);
Router.get("/", PujaController.getAllPuja);
Router.get("/category/:category", PujaController.getPujaByCategory);
Router.get("/title/:title", PujaController.getPujaByTitle);
Router.get("/:id", PujaController.getPujaById);
Router.patch("/:id", PujaController.editPuja);

module.exports = Router;