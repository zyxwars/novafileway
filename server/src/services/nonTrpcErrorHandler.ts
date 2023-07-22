import { Response } from "express";
import { logger } from "./logger";
import { getFilename } from "../utils/fileUtils";

// TODO: make a config to reveal info in prod
export const handleError = ({
  res,
  statusCode = 500,
  message,
  label = getFilename(__filename),
  error,
}: {
  res: Response;
  statusCode?: number;
  message?: string;
  label?: string;
  error?: any;
}) => {
  if (statusCode < 500) {
    logger.info(statusCode + " " + (message || error.message), {
      label,
      error,
    });
  } else logger.error(message || error.message, { label, error });

  res.status(statusCode).json({
    error: { message: message || error.message, trace: error?.trace },
  });
};
