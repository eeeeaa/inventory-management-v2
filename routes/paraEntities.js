const express = require("express");
const router = express.Router();

const controller = require("../controllers/paraEntityController");

router.get("/", controller.getEntities);
router.get("/form", controller.getEntitiesCreateForm);
router.get("/:id/form", controller.getEntitiesUpdateForm);

router.post("/", controller.postEntity);
router.post("/:id", controller.updateEntity);

module.exports = router;
