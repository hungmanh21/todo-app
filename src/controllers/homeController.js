import ToDo from "../models/toDos";

const handleCreateNewToDo = async (req, res) => {
  try {
    let { name, description } = req.body;
    const date = new Date();

    let result = await ToDo.create({ name, description, date });
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
    let result = await ToDo.findOneAndUpdate(
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
    const notDoneList = await ToDo.find({ isFinish: false });
    const doneList = await ToDo.find({ isFinish: true });

    return res.render("home.ejs", {
      notDoneList,
      doneList,
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
export {
  handleCreateNewToDo,
  handleDeleteToDo,
  handleEditToDo,
  handleGetHomePage,
  handleGetEditPage,
  handleFinishTodo,
};
