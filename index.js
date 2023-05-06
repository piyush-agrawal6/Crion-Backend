//imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//connecting to database
const connect = async () => {
  return mongoose.connect(process.env.DB_URL);
};

//use
app.use(express.json());
app.use(cors());

//routes imports
const userRoutes = require("./src/features/Users/userRoute");
const movieRoutes = require("./src/features/Movies/movieRoute");

//routes
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);

//listening
app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`listening on http://localhost:${process.env.PORT}`);
  console.log(process.env.DB_URL);
});
