import { Response } from "express";

export const sendBadRequest = (
  res: Response,
  message: string = "Bad request"
) => {
  res.status(400).send(message);
};

export const sendError = (
  res: Response,
  message: string = "Internal error"
) => {
  // TODO: remove from prod, add error logger
  console.log(message);
  res.status(500).send(message);
};
