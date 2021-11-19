const mongoose = require("mongoose");
require("dotenv").config();
const { UpdatePrice } = require("../update/updatePrice");
const port = 5000;
const Cluster_Name = "cluster0";
const dataBaseName = "node-tuts";
const Url = `mongodb+srv://MohsenBG:${process.env.PASSWORD_MONGO_DB}@${Cluster_Name}.qyxbe.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;

const connect_Mongo_db = async (app: any) => {
  await mongoose
    .connect(Url)
    .then(async () => {
      await app.listen(process.env.PORT || port, () => {
        console.log(`app running on ${port}`);
      });
      console.log("server successfully Connect to MONGO_DB");
      await UpdatePrice();
    })
    .catch((error: any) => {
      console.log("server has problems Connect to MONGO_DB");
      console.log(error);
    });
};

module.exports = connect_Mongo_db;
