import express from "express";
import path from "path";
import webRoutes from "./routes/webRoutes";
import mongoose from "mongoose";
const app = express();
const port = 3000;

// get data
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config static files
app.use("/static", express.static(path.join(__dirname, "public")));

//web routes
app.use("", webRoutes);

(async function () {
  try {
    //connect to database
    //TODO: tạo database mới trên mongodb
    await mongoose.connect("mongodb://127.0.0.1:27017/test"); 

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
