import { Response } from "express";

export const sendBadRequest = (
  res: Response,
  message: string = "Bad request"
) => {
  res.status(400).send(message);
};

export const handleError = (res: Response, error: any) => {
  // TODO: remove from prod, add error logger
  console.log(error);
  // TODO: make a config to reveal info in prod
  res.status(500).send(error.message);
};
