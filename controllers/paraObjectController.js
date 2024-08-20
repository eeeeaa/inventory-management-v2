const asyncHandler = require("express-async-handler");
const repository = require("../db/paraObjectsRepository");
const managerRepository = require("../db/scientistsRepository");
const { body, validationResult } = require("express-validator");
const { checkToken } = require("./common/tokenChecker");

const validateParaObjectData = [
  body("name").trim().escape(),
  body("object_class")
    .custom((input, meta) => {
      return classes.includes(input);
    })
    .withMessage("invalid object class"),
  body("discover_date").isDate(),
  body("manager_id").isNumeric(),
  body("description").trim().escape(),
];

const classes = repository.getObjectClasses();

exports.getObjects = asyncHandler(async (req, res) => {
  const data = await repository.getAllObjects();
  res.render("paraObjects/objectsView", {
    title: "Paranormal Objects",
    objects: data,
  });
});

exports.getObjectsCreateForm = asyncHandler(async (req, res) => {
  const scientists = await managerRepository.getAllScientistData();
  res.render("paraObjects/objectsForm", {
    title: "Add Paranormal Object data",
    object: null,
    classes: classes,
    managers: scientists,
  });
});

exports.getObjectsUpdateForm = asyncHandler(async (req, res) => {
  const scientists = await managerRepository.getAllScientistData();
  const data = await repository.getObject(req.params.id);
  res.render("paraObjects/objectsForm", {
    title: "Update Paranormal Object data",
    object: data,
    classes: classes,
    managers: scientists,
  });
});

exports.postObject = [
  checkToken,
  validateParaObjectData,
  asyncHandler(async (req, res) => {
    const scientists = await managerRepository.getAllScientistData();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("paraObjects/objectsForm", {
        title: "Add Paranormal Object data",
        entity: null,
        managers: scientists,
        classes: classes,
        errors: errors.array(),
      });
    }

    await repository.insertObject({
      name: req.body.name,
      object_class: req.body.object_class,
      discover_date: req.body.discover_date,
      manager_id: req.body.manager_id,
      description: req.body.description,
    });
    res.redirect("/para-objects");
  }),
];

exports.updateObject = [
  checkToken,
  validateParaObjectData,
  asyncHandler(async (req, res) => {
    const scientists = await managerRepository.getAllScientistData();
    const data = await repository.getObject(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("paraObjects/objectsForm", {
        title: "Add Paranormal Object data",
        entity: data,
        managers: scientists,
        classes: classes,
        errors: errors.array(),
      });
    }

    await repository.updateObject({
      id: req.params.id,
      name: req.body.name,
      object_class: req.body.object_class,
      discover_date: req.body.discover_date,
      manager_id: req.body.manager_id,
      description: req.body.description,
    });

    res.redirect("/para-objects");
  }),
];

exports.deleteObject = [
  checkToken,
  asyncHandler(async (req, res) => {
    await repository.deleteObject(req.params.id);
    res.redirect("/para-objects");
  }),
];
