import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  FaBook,
  FaCode,
  FaCopy,
  FaCss3,
  FaFile,
  FaFilePdf,
  FaHtml5,
  FaJs,
  FaPython,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { DeletableCard } from "./DeletableCard";
import { RouterOutput, trpc } from "../utils/trpc";
import { BsTextLeft, BsSoundwave } from "react-icons/bs";
import { TbBinary } from "react-icons/tb";

const getFileIcon = (filename: string, mimetype: string) => {
  const size = 64;

  switch (filename.split(".").pop()) {
    case "pdf":
      return <FaFilePdf size={size} />;
    case "html":
      return <FaHtml5 size={size} />;
    case "css":
      return <FaCss3 size={size} />;
    case "js":
      return <FaJs size={size} />;
    case "py":
      return <FaPython size={size} />;
    case "c":
      return <FaCode size={size} />;
    case "zip" || "rar" || "gz" || "tar":
      return <FaBook size={size} />;
    default:
      switch (mimetype.split("/").shift()) {
        case "text":
          return <BsTextLeft size={size} />;
        case "audio":
          return <BsSoundwave size={size} />;

        default:
          if (filename.includes(".")) return <FaFile size={size} />;
          return <TbBinary size={size} />;
      }
  }
};

export const FileCard = ({
  file,
}: {
  file: RouterOutput["file"]["list"][number];
}) => {
  const utils = trpc.useContext();

  const mutation = trpc.file.deleteById.useMutation({
    onSuccess: () => {
      utils.file.list.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <DeletableCard deleteFn={() => mutation.mutate(file.id)}>
      <a
        href={`${import.meta.env.VITE_FILE_SERVER}/upload/${file.id}`}
        target="_blank"
        className="flex min-h-0 flex-auto items-center justify-center bg-zinc-700  text-white transition duration-500 ease-in hover:bg-zinc-600"
      >
        {file.mimetype.includes("image") ? (
          <img
            className="h-full w-full object-cover"
            src={`${import.meta.env.VITE_FILE_SERVER}/upload/${file.id}`}
          />
        ) : (
          getFileIcon(file.name, file.mimetype)
        )}
      </a>
      <div
        className="whitespace-nowrap+ w-full flex-none overflow-hidden text-ellipsis whitespace-nowrap bg-zinc-800 p-4 text-sm  font-semibold"
        // style={{ wordBreak: "break-all" }}
      >
        {file.name}
      </div>
    </DeletableCard>
  );
};
