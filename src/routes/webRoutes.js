import express from "express";
import {
  handleCreateNewToDo,
  handleGetAllToDos,
  handleEditToDo,
  handleDeleteToDo,
} from "../controllers/homeController";
const router = express.Router();

// nơi khai báo các route của website

// define the home page route
router.get("/todos", handleGetAllToDos);
router.post("/todos", handleCreateNewToDo);
router.put("/todos", handleEditToDo);
router.delete("/todos", handleDeleteToDo);
/* 
define more routes here
router.get("/about", (req, res) => {
  res.send("About birds");
}); 
*/

export default router;
