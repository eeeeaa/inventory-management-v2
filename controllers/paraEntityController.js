const asyncHandler = require("express-async-handler");
const repository = require("../db/paraEntitesRepository");

exports.getEntities = asyncHandler(async (req, res) => {
  const data = await repository.getAllEntities();
  res.render("paraEntities/entitiesView", {
    title: "Paranormal Entities",
    entities: data,
  });
});
