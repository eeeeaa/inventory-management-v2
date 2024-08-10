const asyncHandler = require("express-async-handler");
const repository = require("../db/scientistsRepository");

const { body, validationResult } = require("express-validator");

const validateScientistData = [
  body("name").trim().isAlpha().withMessage(`Name must be alphabetic`),
  body("department").trim(),
];

exports.getScientists = asyncHandler(async (req, res) => {
  const scientists = await repository.getAllScientistData();
  res.render("scientists/scientistsView", { title: "Scientists", scientists });
});

exports.getScientistsCreateForm = asyncHandler(async (req, res) => {
  res.render("scientists/scientistsForm", {
    title: "Create Scientist",
    scientist: null,
  });
});

exports.getScientistsUpdateForm = asyncHandler(async (req, res) => {
  const data = await repository.getScientist(req.params.id);
  res.render("scientists/scientistsForm", {
    title: "Update scientist",
    scientist: data[0],
  });
});

exports.postScientist = [
  validateScientistData,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("scientists/scientistsForm", {
        title: "Create scientist",
        scientist: null,
        errors: errors.array(),
      });
    }

    await repository.insertScientist({
      sci_name: req.body.name,
      department: req.body.department,
    });

    res.redirect("/scientists");
  }),
];

exports.updateScientist = [
  validateScientistData,
  asyncHandler(async (req, res) => {
    const data = await repository.getScientist(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("scientists/scientistsForm", {
        title: "Update scientist",
        scientist: data[0],
        errors: errors.array(),
      });
    }

    await repository.updateScientist({
      id: req.params.id,
      sci_name: req.body.name,
      department: req.body.department,
    });
    res.redirect("/scientists");
  }),
];
