import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaBiohazard,
  FaCloud,
  FaDownload,
  FaEllipsisH,
  FaEye,
  FaEyeSlash,
  FaFirefoxBrowser,
  FaFolderOpen,
  FaPen,
  FaPlus,
  FaRadiation,
  FaServer,
  FaTrash,
} from "react-icons/fa";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useStore } from "../store/store";
import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";

export const Control = () => {
  const utils = trpc.useContext();
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const {
    setIsOpenUploadModal,
    setIsOpenNoteModal,
    addFilesToUpload,
    setIsDeleting,
    isDeleting,
    isOpenNoteModal,
    isOpenUploadModal,
    setNoteText,
    isFilesAndNotesEmpty,
    isDownloadInline,
    setIsDownloadInline,
  } = useStore();
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const filesDeleteAllMutation = trpc.file.deleteAll.useMutation({
    onSuccess: () => utils.file.list.invalidate(),
    onError: (e) => toast.error(e.message),
  });

  const notesDeleteAllMutation = trpc.note.deleteAll.useMutation({
    onSuccess: () => utils.note.list.invalidate(),
    onError: (e) => toast.error(e.message),
  });
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  const handleDragOver = () => setIsDraggingFile(true);
  const handleDragLeave = () => setIsDraggingFile(false);
  const handlePaste = (e: ClipboardEvent) => {
    if (isOpenNoteModal || isOpenUploadModal) return;

    setIsOpenNoteModal(true);
    // TODO: Add file paste, not working on linux?
    setNoteText(e.clipboardData?.getData("text") || "");
  };

  useEffect(() => {
    window.document.body.addEventListener("dragover", handleDragOver);
    window.document.body.addEventListener("dragleave", handleDragLeave);
    window.document.body.addEventListener("paste", handlePaste);

    return () => {
      window.document.body.removeEventListener("dragover", handleDragOver);
      window.document.body.removeEventListener("dragleave", handleDragLeave);
      // window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <>
      <motion.div
        className={`fixed bottom-8 right-6 flex ${
          isFilesAndNotesEmpty && !isOpenOptions ? "animate-bounce" : ""
        } flex-col gap-4`}
        // TODO: Fix stagger animation for children
        animate={{ transition: { staggerChildren: 0.5 } }}
      >
        <AnimatePresence>
          {isOpenOptions && (
            <>
              {/* Delete all */}
              <motion.button
                className="rounded-md bg-gradient-to-r from-emerald-500 to-green-500 p-5 text-2xl text-white shadow-2xl shadow-black"
                initial={{ opacity: 0, y: "100px" }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  if (
                    confirm(
                      "Are you certain you want to delete all uploaded files and notes?"
                    )
                  ) {
                    filesDeleteAllMutation.mutate();
                    notesDeleteAllMutation.mutate();
                  }
                }}
              >
                <FaBiohazard />
              </motion.button>
              {/* Open/Download */}
              <motion.button
                className="rounded-md bg-gradient-to-r from-purple-500 to-violet-500 p-5 text-2xl text-white shadow-2xl shadow-black"
                initial={{ opacity: 0, y: "100px" }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setIsDownloadInline(!isDownloadInline)}
              >
                {isDownloadInline ? <FaCloud /> : <FaDownload />}
              </motion.button>
              {/* Delete */}
              <motion.button
                className="rounded-md bg-gradient-to-r from-pink-500 to-red-500 p-5 text-2xl text-white shadow-2xl shadow-black"
                initial={{ opacity: 0, y: "100px" }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setIsDeleting(!isDeleting)}
              >
                <FaTrash />
              </motion.button>
              {/* Notes */}
              <motion.button
                onClick={() => {
                  setIsOpenNoteModal(true);
                }}
                className="rounded-md   bg-gradient-to-r from-yellow-500 to-amber-500 p-5 text-2xl text-white shadow-2xl shadow-black"
                initial={{ opacity: 0, y: "100px" }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaPen />
              </motion.button>
            </>
          )}
        </AnimatePresence>
        {/* Show more */}
        <motion.button
          className="rounded-md bg-zinc-800 p-5 text-2xl text-white shadow-2xl shadow-black"
          onClick={() => {
            setIsOpenOptions((showOptions) => !showOptions);
            setIsDeleting(false);
          }}
          animate={isOpenOptions ? { rotate: 90 } : { rotate: 0 }}
        >
          <FaEllipsisH />
        </motion.button>
        {/* Upload */}
        <motion.button
          onClick={() => {
            // Open file input
            if (!uploadInputRef?.current) return;
            uploadInputRef.current.click();
          }}
          className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 p-5 text-2xl text-white shadow-2xl shadow-black"
        >
          <input
            ref={uploadInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              // Open modal and add files
              handleDragLeave();
              setIsOpenUploadModal(true);
              addFilesToUpload(e.target?.files);
            }}
          />
          <FaPlus />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isDraggingFile && (
          <motion.div
            className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center border-8 border-dashed bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
          >
            <input
              className="fixed top-0 bottom-0 left-0 right-0 h-full w-full opacity-0"
              type="file"
              multiple
              onChange={(e) => {
                // Open modal and add files
                setIsDraggingFile(false);
                setIsOpenUploadModal(true);
                addFilesToUpload(e.target?.files);
              }}
            />
            <div className="text-2xl font-bold text-white">
              Drop a file to upload
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
