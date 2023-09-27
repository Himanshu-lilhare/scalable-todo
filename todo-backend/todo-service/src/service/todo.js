import { TodoRepository } from "../database/repository/todo-repository.js";

export class TodoService {
  constructor() {
    this.repository = new TodoRepository();
  }

  async CreateTodo(data) {
    let result = await this.repository.CreateTodo(data);
    return result;
  }
  async GetTodos() {
    let result = await this.repository.GetAllTodos();
    return result;
  }
}
