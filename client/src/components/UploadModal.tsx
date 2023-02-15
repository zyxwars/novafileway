import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "./Modal";
import { IUploadableFile, useStore } from "../utils/store";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export const UploadModal = () => {
  const {
    filesToUpload,
    addFilesToUpload,
    isOpenUploadModal,
    setIsOpenUploadModal,
    removeAllFilesToUpload,
    removeFileToUpload,
    queueFilesToUpload,
    setFileUploadProgress,
    setUploading,
    setFree,
    isUploading,
  } = useStore();

  const abortController = useRef(new AbortController());

  const uploadMutation = useMutation({
    mutationFn: (file: IUploadableFile) => {
      console.log("UPLOAD: Uploading " + file.id);

      const formData = new FormData();
      formData.append("file", file.data);

      return axios
        .postForm("http://localhost:8080/files", formData, {
          signal: abortController.current.signal,
          onUploadProgress: (e) => {
            setFileUploadProgress(file.id, e?.progress);
          },
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("UPLOAD: Aborting upload " + file.id);
            // TODO: reset abort controller
            return;
          }

          throw err;
        });
    },
    onSuccess: (data, variables) => {
      console.log("UPLOAD: Finished uploading " + variables.id);
      removeFileToUpload(variables.id);
      setFree();
    },
  });

  const handleClose = () => {
    removeAllFilesToUpload();
    setIsOpenUploadModal(false);
  };

  useEffect(() => {
    console.log(isUploading);

    if (isUploading) return;

    const fileToUpload = filesToUpload.find((file) => file.isUploadQueued);
    if (!fileToUpload) return;

    // TODO:
    setUploading(fileToUpload.id);
    uploadMutation.mutate(fileToUpload);
  }, [filesToUpload]);

  return (
    <Modal isOpen={isOpenUploadModal} onClose={handleClose}>
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
            {filesToUpload.map((file, i) => (
              // File
              <motion.div
                layout
                key={file.id}
                className="relative flex flex-none items-center rounded-sm bg-zinc-800 font-semibold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {/* Progress bar */}
                {file.uploadProgress && (
                  <div
                    className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                    style={{
                      width: `${file.uploadProgress * 100}%`,
                    }}
                  />
                )}
                {/* TODO: Add file size, image thumbnail */}
                <div className="z-10 flex h-full w-full items-center p-3">
                  {/* Info */}
                  <div className=" flex-1" style={{ wordBreak: "break-all" }}>
                    {file.data.name}
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={() =>
                      removeFileToUpload(
                        file.id,
                        file.isBeingUploaded,
                        abortController.current
                      )
                    }
                    className="flex-none rounded-sm bg-zinc-900 p-3 duration-500  enabled:hover:bg-red-600 disabled:opacity-25"
                  >
                    <FaTimes />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between border-t border-white bg-zinc-900 p-4">
          <button
            onClick={handleClose}
            className="rounded-md bg-zinc-800 py-2 px-4 text-lg font-semibold text-white"
          >
            Cancel
          </button>

          <button
            onClick={queueFilesToUpload}
            className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 text-lg font-semibold text-white "
          >
            Upload
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};
