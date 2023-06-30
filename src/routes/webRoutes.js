import express from "express";
import {
  handleCreateNewToDo,
  handleDeleteToDo,
  handleEditToDo,
  handleFinishTodo,
  handleGetEditPage,
  handleGetHomePage,
} from "../controllers/homeController";
import { handleGetLoginPage, handleLogin, handleLogout, handleRegisterNewUser } from "../controllers/authenticationController";
const router = express.Router();

// nơi khai báo các route của website
router.get("/", handleGetHomePage);
router.post("/edit-todo-page", handleGetEditPage);
router.get("/login-page", handleGetLoginPage)

router.post("/create-todo", handleCreateNewToDo);
router.post("/edit-todo", handleEditToDo);
router.post("/delete-todo", handleDeleteToDo);
router.post("/finish-todo", handleFinishTodo);

router.post("/signup-user", handleRegisterNewUser);
router.post("/login-user", handleLogin);
router.post("/logout-user", handleLogout);
export default router;
