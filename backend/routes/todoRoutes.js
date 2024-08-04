import { Router } from "express";
import {
  addTodoItem,
  createTodo,
  deleteATodo,
  getAllTodos,
  removeTodoItem,
  updateTodoItem,
} from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").post(protect, createTodo);
router.route("/").get(protect, getAllTodos);
router.route("/add/:todoListId").put(protect, addTodoItem);
router.route("/remove/:todoListId/:todoId").delete(protect, removeTodoItem);
router.route("/update/:todoListId/:todoId").put(protect, updateTodoItem);
router.route("/delete/:todoListId").delete(protect, deleteATodo);

export default router;
