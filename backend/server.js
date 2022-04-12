const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/db");
const userRoutes = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(userRoutes);

sequelize
  .sync()
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));
