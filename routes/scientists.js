const express = require("express");
const router = express.Router();

const controller = require("../controllers/scientistController");

router.get("/", controller.getScientists);
router.get("/form", controller.getScientistsCreateForm);
router.get("/:id/form", controller.getScientistsUpdateForm);
router.get("/:id/delete", controller.deleteScientist);

router.post("/", controller.postScientist);
router.post("/:id", controller.updateScientist);

module.exports = router;
