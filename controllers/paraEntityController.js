const asyncHandler = require("express-async-handler");
const repository = require("../db/paraEntitesRepository");
const managerRepository = require("../db/scientistsRepository");
const { body, validationResult } = require("express-validator");

const status_list = ["decreased", "alive", "unknown", "shifted"];
const classes = ["safe", "euclid", "keter"];

const validateParaEntityData = [
  body("name").trim().escape(),
  body("entity_class")
    .custom((input, meta) => {
      return classes.includes(input);
    })
    .withMessage("invalid entity class"),
  body("status")
    .custom((input, meta) => {
      return status_list.includes(input);
    })
    .withMessage("invalid status"),
  body("discover_date").isDate(),
  body("manager_id").isNumeric(),
  body("description").trim().escape(),
];

exports.getEntities = asyncHandler(async (req, res) => {
  const data = await repository.getAllEntities();
  res.render("paraEntities/entitiesView", {
    title: "Paranormal Entities",
    entities: data,
  });
});

exports.getEntitiesCreateForm = asyncHandler(async (req, res) => {
  const scientists = await managerRepository.getAllScientistData();
  res.render("paraEntities/entitiesForm", {
    title: "Add paranormal Entities data",
    entity: null,
    managers: scientists,
    status_list: status_list,
    classes: classes,
  });
});

exports.getEntitiesUpdateForm = asyncHandler(async (req, res) => {
  const scientists = await managerRepository.getAllScientistData();
  const data = await repository.getEntity(req.params.id);
  res.render("paraEntities/entitiesForm", {
    title: "Update paranormal Entities data",
    entity: data,
    managers: scientists,
    status_list: status_list,
    classes: classes,
  });
});

exports.postEntity = [
  validateParaEntityData,
  asyncHandler(async (req, res) => {
    const scientists = await managerRepository.getAllScientistData();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("paraEntities/entitiesForm", {
        title: "Add paranormal Entities data",
        entity: null,
        managers: scientists,
        status_list: status_list,
        classes: classes,
        errors: errors.array(),
      });
    }

    await repository.insertEntity({
      name: req.body.name,
      entity_class: req.body.entity_class,
      ent_status: req.body.status,
      discover_date: req.body.discover_date,
      manager_id: req.body.manager_id,
      description: req.body.description,
    });

    res.redirect("/para-entities");
  }),
];

exports.updateEntity = [
  validateParaEntityData,
  asyncHandler(async (req, res) => {
    const scientists = await managerRepository.getAllScientistData();
    const data = await repository.getEntity(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("paraEntities/entitiesForm", {
        title: "Update paranormal Entities data",
        entity: data,
        managers: scientists,
        status_list: status_list,
        classes: classes,
        errors: errors.array(),
      });
    }

    await repository.updateEntity({
      id: req.params.id,
      name: req.body.name,
      entity_class: req.body.entity_class,
      ent_status: req.body.status,
      discover_date: req.body.discover_date,
      manager_id: req.body.manager_id,
      description: req.body.description,
    });
    res.redirect("/para-entities");
  }),
];
