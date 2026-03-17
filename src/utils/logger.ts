import fs from "fs";
import path from "path";

const LOG_DIR = path.join(process.cwd(), "logs");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const getTimestamp = () => new Date().toISOString();

const writeToFile = (level: string, message: string) => {
  const date = new Date().toISOString().split("T")[0];
  const logFile = path.join(LOG_DIR, `${date}.log`);
  const line = `[${level}] ${getTimestamp()} - ${message}\n`;
  fs.appendFileSync(logFile, line);
};

const logger = {
  info: (message: string, ...args: unknown[]) => {
    const full = args.length ? `${message} ${JSON.stringify(args)}` : message;
    console.log(`\x1b[36m[INFO]\x1b[0m ${getTimestamp()} - ${full}`);
    writeToFile("INFO", full);
  },
  error: (message: string, ...args: unknown[]) => {
    const full = args.length ? `${message} ${JSON.stringify(args)}` : message;
    console.error(`\x1b[31m[ERROR]\x1b[0m ${getTimestamp()} - ${full}`);
    writeToFile("ERROR", full);
  },
  warn: (message: string, ...args: unknown[]) => {
    const full = args.length ? `${message} ${JSON.stringify(args)}` : message;
    console.warn(`\x1b[33m[WARN]\x1b[0m ${getTimestamp()} - ${full}`);
    writeToFile("WARN", full);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      const full = args.length ? `${message} ${JSON.stringify(args)}` : message;
      console.debug(`\x1b[35m[DEBUG]\x1b[0m ${getTimestamp()} - ${full}`);
      writeToFile("DEBUG", full);
    }
  },
};

export default logger;
