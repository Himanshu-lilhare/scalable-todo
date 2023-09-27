import express from "express";

import { ValidationError } from "../utils/errors/app-errors.js";
import { TodoService } from "../service/todo.js";

const todoRouter = express.Router();

todoRouter.post("/create-todo", async (req, res, next) => {
  const service = new TodoService();
  try {
    const { name, description } = req.body;
    if (!description || !name)
    throw new ValidationError("Missing Required Fields");
    const data = await service.CreateTodo({ description, name });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

todoRouter.get("/get-todos", async (req, res, next) => {
  const service = new TodoService();
  try {
    let todos= await service.GetTodos();

    return res.json(todos);
  } catch (err) {
    next(err);
  }
});

todoRouter.delete("/delete-todo", async (req, res, next) => {
  const service = new TodoService();
  try {
    let deleted = await service.DeleteTodo();
    return res.json(deleted);
  } catch (err) {
    next(err);
  }
});

export default todoRouter;
