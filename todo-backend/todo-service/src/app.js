import todoRouter from "./api/todo.js";

import express, { urlencoded } from "express";

async function express_app(app) {
  app.use(express.json());
  app.use(todoRouter);
}

export { express_app };
