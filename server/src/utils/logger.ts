import { createLogger, format, transports } from "winston";
import { LOGS_DIR } from "../constants";
import path from "path";

const logFormat = format.printf(
  (info) =>
    `${info.timestamp} ${info.level} [${info.label || "server"}]: ${
      info.message
    }`
);

export const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    new transports.File({
      filename: path.join(LOGS_DIR, "error.log"),
      level: "error",
      format: format.json(),
    }),
    new transports.File({
      filename: path.join(LOGS_DIR, "combined.log"),
      format: format.json(),
    }),
  ],
});
