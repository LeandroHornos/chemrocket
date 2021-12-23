import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

let Todos = mongoose.models.todo || mongoose.model("todo", todoSchema);

export default Todos;
