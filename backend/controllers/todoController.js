import ToDo from "../models/ToDo.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const user = req.user;

    if (!title) {
      res.status(409).json({
        success: false,
        message: "Title required",
      });
      return;
    }

    const todo = await ToDo.create({
      userID: user._id,
      title,
    });

    res.status(200).json({
      success: false,
      message: "ToDo created successfully",
      todo,
    });
  } catch (err) {
    console.error("Error creating todo :", err);
  }
};

export const toggleTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;

    if (!id) {
      res.status(409).json({
        success: false,
        message: "Todo ID required",
      });
      return;
    }

    const todo = await ToDo.findOne({ userID: user._id, _id: id });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "ToDo not found.",
      });
      return;
    }
    const todoStatusUpdate = !todo.isChecked;
    todo.isChecked = todoStatusUpdate;
    todo.save();

    res.status(200).json({
      success: true,
      message: `ToDo ${todoStatusUpdate ? "checked" : "un-checked"}`,
    });
  } catch (err) {
    console.error("Error toggling todo :", err);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.body;
    const user = req.user;

    if (!id) {
      res.status(409).json({
        success: false,
        message: "Todo ID required",
      });
      return;
    }

    const todo = await ToDo.findOneAndDelete({ userID: user._id, _id: id });

    if (!todo) {
      res.status(404).json({
        success: false,
        message: "ToDo not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "ToDo deleted.",
    });
  } catch (err) {
    console.error("Error deleting todo :", err);
  }
};
