const express = require("express");
const app = express();
const path = require("node:path");
const cookieParser = require("cookie-parser");

const scientistRouter = require("./routes/scientists");
const paraEntityRouter = require("./routes/paraEntities");
const paraObjectRouter = require("./routes/paraObjects");
const indexRouter = require("./routes/index");

//setup static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//setup view engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/scientists", scientistRouter);
app.use("/para-entities", paraEntityRouter);
app.use("/para-objects", paraObjectRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
