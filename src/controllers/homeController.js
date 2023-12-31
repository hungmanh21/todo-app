import ToDo from "../models/ToDo";
import { handleDecodeToken } from "./authenticationController";

const handleCreateNewToDo = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token === undefined) return res.redirect("/login-page");
    const payload = await handleDecodeToken(token);
    const { id } = payload;
    let { name, description } = req.body;
    const date = new Date();

    await ToDo.create({ name, description, date, owner: id });
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};
const handleEditToDo = async (req, res) => {
  try {
    let { id, name, description } = req.body;
    const date = new Date();
    await ToDo.findOneAndUpdate(
      { _id: id },
      { name, description, date },
      { new: true }
    );

    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};
const handleDeleteToDo = async (req, res) => {
  try {
    const { id } = req.body;
    await ToDo.deleteOne({ _id: id });
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};

const handleFinishTodo = async (req, res) => {
  try {
    const { id } = req.body;
    await ToDo.findOneAndUpdate({ _id: id }, { isFinish: true });
    return res.redirect("/");
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};

const handleGetHomePage = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token === undefined) return res.redirect("/login-page");
    const payload = await handleDecodeToken(token);
    const { username, id } = payload;
    const notDoneList = await ToDo.find({
      isFinish: false,
      owner: id,
    });
    const doneList = await ToDo.find({ isFinish: true, owner: id });

    return res.render("home.ejs", {
      notDoneList,
      doneList,
      username,
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};

const handleGetEditPage = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await ToDo.find({ _id: id });
    return res.render("editTodo.ejs", {
      data: result[0],
    });
  } catch (error) {
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};

const handleSearchingTodo = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token === undefined) return res.redirect("/login-page");
    const payload = await handleDecodeToken(token);
    const { username, id } = payload;
    const { search_term } = req.body;
    const e_search_term = search_term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const notDoneList = await ToDo.find({
      name: {$regex: e_search_term, $options: 'i'},
      isFinish: false,
      owner: id,
    });

    const doneList = await ToDo.find({
      name: {$regex: e_search_term, $options: 'i'}, 
      isFinish: true, 
      owner: id 
    });

    return res.render("home.ejs", {
      notDoneList,
      doneList,
      username,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      errorCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
}

export {
  handleCreateNewToDo,
  handleDeleteToDo,
  handleEditToDo,
  handleGetHomePage,
  handleGetEditPage,
  handleFinishTodo,
  handleSearchingTodo,
};
