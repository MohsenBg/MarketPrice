import bodyParser from "body-parser";
import { Application } from "express";
import path from "path";
const express = require("express");
const app: Application = express();
const morgan = require("morgan");
const SinglePrice = require("./route/api/CoinsName/Price/index");
const AllCoinsPrice = require("./route/api/Coins/Price");
const Symbol = require("./route/api/CoinsName/Price/symbol");
const CoinsName = require("./route/api/CoinsName/index");
const Coins = require("./route/api/Coins/index");
const connect_Mongo_db = require("./Connection/Connect");
const cors = require("cors");
app.use(bodyParser.json());
app.use(cors());
//?-------------
connect_Mongo_db(app);
//?-------------

//!-----------------------------

app.use(morgan("dev"));
//!---------------------------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/view/Home.html"));
});

//! ====> /api/Coins
app.use("/", Coins);

//! ====> /api/Coins/Price
app.use("/", AllCoinsPrice);

//! ====> /api/:CoinsName
app.use("/", CoinsName);

//! ====> /api/:CoinName/Price
app.use("/", SinglePrice);

//! ====> /api/:CoinName/Price/:Symbol
app.use("/", Symbol);

//!404page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname + "/view/404.html"));
});
