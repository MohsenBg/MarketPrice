import axios from "axios";
import bodyParser from "body-parser";
import { Application } from "express";
const express = require("express");
const app: Application = express();
const morgan = require("morgan");
const Price = require("./route/api/CoinsName/Price/index");
const CoinsName = require("./route/api/CoinsName/index");
const connect_Mongo_db = require("./Connection/Connect");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
//?-------------
connect_Mongo_db(app);
//?-------------

//!-----------------------------
app.set("view engine", "ejs");
app.set("views", "view");
app.use(morgan("dev"));
//!---------------------------

app.get("/", (req, res) => {
  res.render("Home");
});

//!/api/:CoinsName
app.use("/", CoinsName);

//!/api/:CoinName/Price
app.use("/", Price);
// app.use("/updatePrice", updatePrice);
app.use((req, res) => {
  res.status(404).render("404");
});
