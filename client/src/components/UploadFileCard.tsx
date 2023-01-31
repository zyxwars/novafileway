import React from "react";
import { IFile } from "../types";

export const UploadFileCard = ({ file }: { file: File }) => {
  return <div className="bg-white w-60 h-full">{file.name}</div>;
};
