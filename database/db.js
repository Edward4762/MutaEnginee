const moongose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://satyam:mutaengine@cluster0.xoqjh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

exports.connect = () => {
  moongose
    .connect(MONGO_URL, {})
    .then(console.log("DB connected succesfully"))
    .catch((error) => {
      console.log("DB connection failed");
      console.log(error);
      process.exit(11);
    });
};
