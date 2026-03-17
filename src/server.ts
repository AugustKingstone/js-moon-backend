import app from "./app";
import { env } from "./config/env";
import logger from "./utils/logger";

const banner = `
╔══════════════════════════════════════════╗
║         JS-MOON BACKEND SERVER           ║
╠══════════════════════════════════════════╣
║  Environment : ${env.nodeEnv.padEnd(24)}║
║  Port        : ${String(env.port).padEnd(24)}║
║  Database    : PostgreSQL                ║
╚══════════════════════════════════════════╝
`;

app.listen(env.port, () => {
  console.log(banner);
  logger.info(`Server started on http://localhost:${env.port}`);
  logger.info(`Health check: http://localhost:${env.port}/health`);
  logger.info(`API base URL: http://localhost:${env.port}/api/v1`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`, error.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
  process.exit(1);
});
