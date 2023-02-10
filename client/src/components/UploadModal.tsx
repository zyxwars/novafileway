import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "./Modal";
import { useStore } from "../utils/store";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

export const UploadModal = () => {
  // TODO: Pack into mutation after progress bar is done
  // TODO: Invalidate after await all queries?, use the mutation?

  const {
    filesToUpload,
    addFilesToUpload,
    removeFileToUpload,
    cancelFileUpload,
    isOpenUploadModal,
    setIsOpenUploadModal,
    setUploadProgress,
  } = useStore();

  const handleUpload = () => {
    filesToUpload.forEach((file) => {
      // TODO: get progress

      const formData = new FormData();
      formData.append("file", file);

      axios.postForm("http://localhost:8080/files", formData, {
        onUploadProgress: (e) => {
          setUploadProgress(file, e?.progress || 0);

          if (e.progress === 1) {
            removeFileToUpload(file);
          }
        },
      });
    });

    // TODO: Close modal and invalidate cache
  };

  return (
    <Modal isOpen={isOpenUploadModal} onClose={() => cancelFileUpload()}>
      <motion.div
        className="grid h-full w-full grid-flow-row overflow-hidden bg-zinc-900 sm:h-5/6 sm:w-3/5 sm:rounded-md"
        style={{
          gridTemplateRows: "3.5rem 1fr auto",
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="relative flex flex-none items-center justify-center rounded-b-xl bg-gradient-to-r from-cyan-500 to-blue-500">
          <input
            className="absolute top-0 left-0 bottom-0 w-full opacity-0"
            type="file"
            multiple
            // directory=""
            // webkitdirectory=""
            // mozdirectory=""
            onChange={(e) => {
              addFilesToUpload(e.target?.files);
            }}
          />
          <div className="font-sans font-bold text-white">
            {filesToUpload.length > 0
              ? "Add more files"
              : "Click or drag a File here"}
          </div>
        </div>

        {/* Files */}
        <div className="flex w-full flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-4">
          <AnimatePresence>
            {filesToUpload.map((file, i) => {
              return (
                // File
                <motion.div
                  layout
                  key={file.name}
                  className="relative flex flex-none items-center rounded-sm bg-zinc-800 font-semibold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {/* TODO: Make this nicer */}
                  <div
                    className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                    style={{
                      width: `${(file.progress || 0) * 100}%`,
                    }}
                  ></div>
                  <div
                    className="z-10 flex-1 p-3"
                    style={{ wordBreak: "break-all" }}
                  >
                    {file.name}
                  </div>
                  <div
                    className="z-10 flex-none cursor-pointer p-3"
                    onClick={() => removeFileToUpload(file)}
                  >
                    <div className="material-symbols-outlined rounded-sm bg-zinc-900 p-2 duration-500  hover:bg-red-600">
                      <FaTimes />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between border-t border-white bg-zinc-900 p-4">
          <button
            onClick={() => {
              cancelFileUpload();
            }}
            className="rounded-md bg-zinc-800 py-2 px-4 text-lg font-semibold text-white"
          >
            Cancel
          </button>

          <button
            onClick={() => handleUpload()}
            className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 text-lg font-semibold text-white "
          >
            Upload
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};
