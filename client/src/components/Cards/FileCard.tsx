import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  FaBook,
  FaClock,
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
  FaStopwatch,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { DeletableCard } from "./DeletableCard";
import { RouterOutput, trpc } from "../../utils/trpc";
import { BsTextLeft, BsSoundwave } from "react-icons/bs";
import { TbBinary } from "react-icons/tb";
import { useStore } from "../../store/store";
import { formatFileSize, formatTimeRemaining } from "../../utils/formatting";

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

export const FileCard = ({
  file,
}: {
  file: RouterOutput["file"]["list"][number];
}) => {
  const utils = trpc.useContext();
  const { isDownloadInline } = useStore();
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const { isDeleting } = useStore();

  const mutation = trpc.file.deleteById.useMutation({
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

  const handleToggleDetails = () => {
    setIsOpenDetails((isOpenDetails) => !isOpenDetails);
  };

  return (
    <DeletableCard deleteFn={() => mutation.mutate(file.id)}>
      {/* Preview */}
      <a
        href={`${import.meta.env.VITE_API_URL}/upload/${
          file.id
        }?openInBrowser=${isDownloadInline}`}
        target={isDownloadInline ? "_blank" : "_self"}
        // TODO: Set color based on filetype
        className="flex min-h-0 flex-auto items-center justify-center bg-zinc-700 bg-gradient-to-r from-slate-500 to-zinc-500  transition duration-500 ease-in hover:bg-zinc-600"
      >
        {file.hasThumbnail ? (
          <img
            className="h-full w-full object-cover"
            alt="thumbnail"
            src={`${import.meta.env.VITE_API_URL}/upload/thumbnails/${file.id}`}
          />
        ) : (
          <motion.div>{getFileIcon(file.name, file.mimetype)}</motion.div>
        )}
      </a>
      {/* Details */}
      <div
        className="w-full flex-none bg-gradient-to-r from-slate-700  to-zinc-700 p-3"
        style={{ wordBreak: "break-all" }}
        onClick={handleToggleDetails}
      >
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
          {file.name}
        </div>
        <div className="text-sm text-slate-300">
          {formatFileSize(file.size)}
        </div>
        {/* TODO: Animate details */}
        {isOpenDetails && (
          <>
            <div className="text-sm text-slate-300">{file.mimetype}</div>
            <div className="text-sm text-slate-300">{file.createdAt}</div>
            <div className="text-sm text-slate-300">{file.uploaderIp}</div>
          </>
        )}
      </div>
      {/* Delete time */}
      {!isDeleting && (
        <div className="absolute top-1 left-1 rounded-sm bg-[rgba(0,0,0,0.3)] py-1 px-2">
          <div className="flex items-center gap-1 text-white">
            <FaTrash size={16} />
            <div>
              {formatTimeRemaining(
                new Date(file.deleteAt).getTime() - new Date().getTime()
              )}
            </div>
          </div>
        </div>
      )}
    </DeletableCard>
  );
};
