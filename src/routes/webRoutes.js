import express from "express";
import { handleGetAllToDos } from "../controllers/homeController";
const router = express.Router();

// nơi khai báo các route của website

// define the home page route
router.get("/", (req, res) => {
  res.render("home.ejs");
});

/* 
define more routes here
router.get("/about", (req, res) => {
  res.send("About birds");
}); 
*/

export default router;
