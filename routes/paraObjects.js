const express = require("express");
const router = express.Router();

const controller = require("../controllers/paraObjectController");
router.get("/", controller.getObjects);

module.exports = router;
