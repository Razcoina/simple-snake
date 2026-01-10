import express from "express";
import { rateLimit } from "express-rate-limit";
import "dotenv/config";

import { initDB } from "./config/db.js";
import webRoutes from "./routes/web.js";

const server = express();

// Environment
const APP_ENV = process.env.APP_ENV ?? "development";
const PORT = APP_ENV === "production" ? 80 : 8000;

// Limit the number of connections per client in a time interval
const limiter = rateLimit({
  windowMs: 2000,
  limit: 2,
  message: "Too many requests, slow down!",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(limiter);
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
