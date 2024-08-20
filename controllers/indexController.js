const { body, validationResult } = require("express-validator");
const { setInput } = require("./common/tokenChecker");

exports.getIndexPage = (req, res) => {
  res.render("index");
};

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getLoginForm = (req, res) => {
  res.render("login");
};

exports.postLogin = [
  body("password").trim().escape(),
  (req, res) => {
    //simple admin password set
    setInput(req.body.password);
    res.redirect("/");
  },
];
