import express from "express";
import { PORT } from "./config/index.js";
import { databaseConnection } from "./database/connection.js";
import { express_app } from "./app.js";

const app = express();
const StartServer = async () => {
  await databaseConnection();

  await express_app(app);

  // Error Handler || Error Logger
  app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const data = error.data || error.message;
    return res.status(statusCode).json(data);
  });

  // Listening
  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
