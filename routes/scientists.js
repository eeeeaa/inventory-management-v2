const express = require("express");
const router = express.Router();

const controller = require("../controllers/scientistController");

router.get("/", controller.getScientists);

module.exports = router;
