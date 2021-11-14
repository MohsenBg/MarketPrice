const mongoose = require("mongoose");
require("dotenv").config();
const AssetHandler = require("../update/assetPrice");
const port = 5000;
const Cluster_Name = "cluster0";
const dataBaseName = "node-tuts";

const Url = `mongodb+srv://MohsenBG:${process.env.PASSWORD_MONGO_DB}@${Cluster_Name}.qyxbe.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;

const connect_Mongo_db = async (app: any) => {
  await mongoose
    .connect(Url)
    .then(async () => {
      await app.listen(port, () => {
        console.log(`app running on ${port}`);
      });
      console.log("mongo Connect");
    })
    .catch((error: any) => {
      console.log(error);
    });
};

module.exports = connect_Mongo_db;
