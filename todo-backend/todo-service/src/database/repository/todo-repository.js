import { todoModel as TodoModel } from "../models/Todo.js";
import { APIError, STATUS_CODES } from "../../utils/errors/app-errors.js";

export class TodoRepository {
  async CreateTodo(data) {
    console.log("aya");
    const todoResult = await TodoModel.create(data);

    return todoResult;
  }
  async FindTodo(todoId) {
    const existingTodo = await TodoModel.findById(todoId);
    return existingTodo;
  }

  async GetAllTodos(){
    const todos = await TodoModel.find({})
    return todos 
  }

}
