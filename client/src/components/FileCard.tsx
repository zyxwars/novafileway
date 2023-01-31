import React from "react";
import { IFile } from "../types";

export const FileCard = ({ file }: { file: IFile }) => {
  return <div className="bg-white">{file.originalname}</div>;
};
