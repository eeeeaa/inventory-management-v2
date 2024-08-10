const express = require("express");
const router = express.Router();

const controller = require("../controllers/paraEntityController");

router.get("/", controller.getEntities);

module.exports = router;
