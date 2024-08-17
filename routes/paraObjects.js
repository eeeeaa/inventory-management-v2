const express = require("express");
const router = express.Router();

const controller = require("../controllers/paraObjectController");
router.get("/", controller.getObjects);
router.get("/form", controller.getObjectsCreateForm);
router.get("/:id/form", controller.getObjectsUpdateForm);

router.post("/", controller.postObject);
router.post("/:id", controller.updateObject);

module.exports = router;
