import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    name: String,
    description: String,
    isComplete: {
      type: Boolean,
      default: false,
    },
   
  },
  { timestamps: true }
);

export const todoModel = mongoose.model("todo", TodoSchema);
