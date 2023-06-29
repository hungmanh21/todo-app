import ToDo from "../models/toDos";

const handleGetAllToDos = async (req, res) => {
  try {
    let result = await ToDo.find({});

    return res.status(200).json({
      erorrCode: 0,
      data: result,
      message: "Get all todos successfully",
    });
  } catch (error) {
    return res.status(500).json({
      erorrCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};
const handleCreateNewToDo = async (req, res) => {
  try {
    let { name, description, date } = req.body;
    date = date || new Date();

    let result = await ToDo.create({ name, description, date });
    return res.status(200).json({
      erorrCode: 0,
      data: result,
      message: "Create new todo successfully",
    });
  } catch (error) {
    return res.status(500).json({
      erorrCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};
const handleEditToDo = async (req, res) => {
  try {
    let { id, name, description, date } = req.body;

    let result = await ToDo.findOneAndUpdate(
      {_id: id}, 
      { name, description, date }, 
      {new: true}
    );
    return res.status(200).json({
      erorrCode: 0,
      data: result,
      message: "Update todo successfully",
    });
  } catch (error) {
    return res.status(500).json({
      erorrCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};
const handleDeleteToDo = async (req, res) => {
  try {
    const {id} = req.body;

    let result = await ToDo.deleteOne(
      { _id: id },
    );
    return res.status(200).json({
      erorrCode: 0,
      data: result,
      message: "Delete todo successfully",
    });
  } catch (error) {
    return res.status(500).json({
      erorrCode: -1,
      data: {},
      message: "Something went wrong",
    });
  }
};

export {
  handleCreateNewToDo,
  handleDeleteToDo,
  handleEditToDo,
  handleGetAllToDos,
};
