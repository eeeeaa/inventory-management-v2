const asyncHandler = require("express-async-handler");
const repository = require("../db/paraObjectsRepository");

exports.getObjects = asyncHandler(async (req, res) => {
  const data = await repository.getAllObjects();
  res.render("paraObjects/objectsView", {
    title: "Paranormal Objects",
    objects: data,
  });
});
