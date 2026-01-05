import express from "express";
import "dotenv/config";

import { initDB } from "./config/db.js";
import webRoutes from "./routes/web.js";

const server = express();

// Environment
const APP_ENV = process.env.APP_ENV ?? "development";
const PORT = APP_ENV === "production" ? 80 : 8000;

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

// Routes
server.use("/", webRoutes);

// Bootstrap
async function bootstrap() {
  try {
    await initDB();

    server.listen(PORT, () => {
      console.log(
        `${process.env.APP_NAME ?? "App"} running in ${APP_ENV} on port ${PORT}`,
      );
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}

// And run everything!
bootstrap();
