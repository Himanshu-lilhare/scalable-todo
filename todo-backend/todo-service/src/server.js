import express from "express";
import { PORT } from "./config/index.js";
import { databaseConnection } from "./database/connection.js";
import { express_app } from "./app.js";
import { errorHandler } from "./utils/errors/error-handler.js";
import { AppEvent } from "./api/app-event.js";

const app = express();
const StartServer = async () => {
  await databaseConnection();
 
  express_app(app);

  AppEvent(app);

  // Error Handler || Error Logger
  errorHandler(app);

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
