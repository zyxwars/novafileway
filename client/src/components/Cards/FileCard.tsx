import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import {
  FaBook,
  FaCode,
  FaCompress,
  FaCopy,
  FaCss3,
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaHtml5,
  FaJs,
  FaPython,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { DeletableCard } from "./DeletableCard";
import { RouterOutput, trpc } from "../../utils/trpc";
import { BsTextLeft, BsSoundwave } from "react-icons/bs";
import { TbBinary } from "react-icons/tb";
import { useStore } from "../../store/store";

const getFileIcon = (filename: string, mimetype: string) => {
  const size = 80;

  // TODO: Multitple extensions for one file icon
  switch (filename.split(".").pop()) {
    case "pdf":
      return <FaFilePdf size={size} />;
    case "docx":
      return <FaFileWord size={size} />;
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
    // TODO: Zipper icon
    case "zip":
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

const formatFileSize = (size: number) => {
  if (size > 10 ** 9) return `${(size / 10 ** 9).toFixed(2)} Gb`;
  else if (size > 10 ** 6) return `${(size / 10 ** 6).toFixed(2)} Mb`;
  else if (size > 10 ** 3) return `${(size / 10 ** 3).toFixed(2)} Kb`;
  else return `${size} B`;
};

export const FileCard = ({
  file,
}: {
  file: RouterOutput["file"]["list"][number];
}) => {
  const utils = trpc.useContext();
  const { isDownloadInline } = useStore();

  const mutation = trpc.file.deleteById.useMutation({
    // TODO:
    onMutate: (deletedId) => {
      utils.file.list.setData(
        undefined,
        (utils.file.list.getData() || []).filter(
          (file) => file.id !== deletedId
        )
      );
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return (
    <DeletableCard deleteFn={() => mutation.mutate(file.id)}>
      <a
        href={`${import.meta.env.VITE_API_URL}/upload/${
          file.id
        }?openInBrowser=${isDownloadInline}`}
        target={isDownloadInline ? "_blank" : "_self"}
        // TODO: Set color based on filetype
        className="flex min-h-0 flex-auto items-center justify-center bg-zinc-700 bg-gradient-to-r from-slate-500 to-zinc-500  transition duration-500 ease-in hover:bg-zinc-600"
      >
        {file.mimetype.includes("image") ? (
          <img
            className="h-full w-full object-cover"
            alt="thumbnail"
            src={`${import.meta.env.VITE_API_URL}/upload/thumbnails/${file.id}`}
          />
        ) : (
          <motion.div>{getFileIcon(file.name, file.mimetype)}</motion.div>
        )}
      </a>
      <div
        className="flex-nonebg-zinc-800 w-full bg-gradient-to-r from-slate-700  to-zinc-700 p-3"
        // style={{ wordBreak: "break-all" }}
      >
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
          {file.name}
        </div>
        <div className="text-sm">{formatFileSize(file.size)}</div>
      </div>
    </DeletableCard>
  );
};
