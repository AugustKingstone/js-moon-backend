import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import logger from "./utils/logger";

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, error: "Too many requests, please try again later." },
});

// Middlewares globaux
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging HTTP avec Morgan -> logger custom
const morganStream = {
  write: (message: string) => logger.info(message.trim()),
};
app.use(morgan(":method :url :status :res[content-length] - :response-time ms", { stream: morganStream }));

// Routes
app.use("/api/v1", routes);

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

// Gestion des erreurs
app.use(errorMiddleware);

export default app;
