import express from "express";
import path from "path";
import webRoutes from "./routes/webRoutes";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
const port = 3000;

// get data
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config static files
app.use(express.static(path.join(__dirname, "public")));

// config template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//web routes
app.use("/", webRoutes);

(async function () {
  try {
    //connect to database
    await mongoose.connect(
      "mongodb+srv://root:lxrVN15G3J8Uk55A@cluster0.adaj30j.mongodb.net/?retryWrites=true&w=majority"
    );

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
