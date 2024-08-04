import asyncHandler from "../middlewares/asyncHandler.js";
import Todo from "../models/todoModel.js";

// POST: Create a to-do
export const createTodo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { todoName, todos } = req.body;

  if (!todoName) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  } else {
    const createTodo = await Todo.create({
      userId,
      todoName,
      todos,
    });

    if (createTodo) {
      res.status(201).json({
        sts: "01",
        msg: "Success",
        todoName: createTodo.todoName,
        todos: createTodo.todos,
      });
    } else {
      res.status(400);
      throw new Error("To-do creation failed. Try again!");
    }
  }
});

// Add a new todo item to the existing todo list
export const addTodoItem = asyncHandler(async (req, res) => {
  const { todoListId } = req.params;
  const { todo } = req.body;

  if (!todoListId) {
    res.status(400);
    throw new Error("Please send to-do list ID");
  } else {
    // Find the to-do list
    const updatedTodoList = await Todo.findByIdAndUpdate(
      todoListId,
      { $push: { todos: todo } },
      { new: true }
    );

    if (updatedTodoList) {
      res.status(201).json({ sts: "01", msg: "Success", updatedTodoList });
    } else {
      res.status(500);
      throw new Error("Some error occured!");
    }
  }
});

// Remove/Delete a to-do item from one to-do
export const removeTodoItem = asyncHandler(async (req, res) => {
  const { todoListId, todoId } = req.params;

  if (!todoListId || !todoId) {
    res.status(400);
    throw new Error("Please send to-do list ID and to-do ID");
  } else {
    // Find the to-do list
    const updateTodoList = await Todo.findByIdAndUpdate(
      todoListId,
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );

    if (updateTodoList) {
      res.status(200).json({ sts: "01", msg: "Success", updateTodoList });
    } else {
      res.status(500);
      throw new Error("Some error occured!");
    }
  }
});

// Update one todo item (text and status)
export const updateTodoItem = asyncHandler(async (req, res) => {
  const { todoListId, todoId } = req.params;
  const { todoText, todoStatus } = req.body;

  if (!todoListId || !todoId) {
    res.status(400);
    throw new Error("Please send to-do list ID and to-do ID");
  } else {
    // Find the to-do list
    const todoList = await Todo.findById(todoListId);

    if (!todoList) {
      res.status(404);
      throw new Error("Can't find the todolist!");
    }

    // Find the perticular to-do
    const todoItem = todoList.todos.id(todoId);

    if (!todoItem) {
      res.status(404);
      throw new Error("Todo item not found");
    }

    // Update the to-do
    todoItem.todoText = todoText || todoItem.todoText;
    todoItem.todoStatus = todoStatus !== undefined ? todoStatus : todoItem.todoStatus;

    const updateTodoList = await todoList.save();

    if (updateTodoList) {
      res.status(200).json({ sts: "01", msg: "Success", updateTodoList });
    } else {
      res.status(500);
      throw new Error("Some error occured!");
    }
  }
});

// Get all To-Dos of a user
export const getAllTodos = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const allTodos = await Todo.find({ userId });

  if (allTodos) {
    res.status(200).json({
      sts: "01",
      msg: "Success",
      allTodos,
    });
  } else {
    res.status(404);
    throw new Error("No to-dos added yet");
  }
});

// Delete a To-Do by a user
export const deleteATodo = asyncHandler(async (req, res) => {
  const { todoListId } = req.params;

  const deleteTodo = await Todo.findByIdAndDelete(todoListId);

  if (deleteTodo) {
    res.status(201).json({ sts: "01", msg: "Success" });
  } else {
    res.status(404);
    throw new Error("This to-do doesn't exist!");
  }
});
