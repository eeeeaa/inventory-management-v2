require("dotenv").config();

let input = "";

exports.setInput = (pwd) => {
  input = pwd;
};

exports.checkToken = (req, res, next) => {
  if (input === process.env.SECRET) {
    next();
  } else {
    res.redirect("/login");
  }
};
