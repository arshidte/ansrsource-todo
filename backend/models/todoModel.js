import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    todoName: {
      type: String,
      required: true,
    },
    todos: [
      {
        todoText: { type: String, required: true },
        todoStatus: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
