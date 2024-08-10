const asyncHandler = require("express-async-handler");
const repository = require("../db/scientistsRepository");

exports.getScientists = asyncHandler(async (req, res) => {
  const scientists = await repository.getAllScientistData();
  res.render("scientists/scientistsView", { title: "Scientists", scientists });
});
