import express from "express";
import {
  handleCreateNewToDo,
  handleDeleteToDo,
  handleEditToDo,
  handleFinishTodo,
  handleGetEditPage,
  handleGetHomePage,
} from "../controllers/homeController";
const router = express.Router();

// nơi khai báo các route của website
router.get("/", handleGetHomePage);
router.post("/edit-todo-page", handleGetEditPage);

router.post("/create-todo", handleCreateNewToDo);
router.post("/edit-todo", handleEditToDo);
router.post("/delete-todo", handleDeleteToDo);
router.post("/finish-todo", handleFinishTodo)

export default router;
