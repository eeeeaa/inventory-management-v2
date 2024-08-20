const express = require("express");
const router = express.Router();

const controller = require("../controllers/indexController");

router.get("/", controller.getIndexPage);
router.get("/about", controller.getAboutPage);
router.get("/login", controller.getLoginForm);
router.post("/login", controller.postLogin);

module.exports = router;
