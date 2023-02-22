import React, { ComponentPropsWithoutRef, useRef, useState } from "react";
import {
  FaBiohazard,
  FaEllipsisH,
  FaPen,
  FaPlus,
  FaRadiation,
  FaTrash,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../utils/store/store";
import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";

export const Control = () => {
  const utils = trpc.useContext();
  const [showOptions, setShowOptions] = useState(false);
  const {
    setIsOpenUploadModal,
    setIsOpenNoteModal,
    addFilesToUpload,
    setIsDeleting,
    isDeleting,
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

  return (
    <motion.div
      className="fixed bottom-8 right-6 flex flex-col gap-4 "
      // TODO: Fix the stagger
      animate={{ transition: { staggerChildren: 0.5 } }}
    >
      <AnimatePresence>
        {showOptions && (
          <>
            {/* Delete all */}
            <motion.button
              className="rounded-md border-2 border-white bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-2xl text-white shadow-md"
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
            {/* TODO: Delete */}
            <motion.button
              className="rounded-md border-2 border-white bg-gradient-to-r from-pink-500 to-red-500 p-4 text-2xl text-white shadow-md"
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
              className="rounded-md border-2 border-white bg-gradient-to-r from-yellow-300 to-amber-500 p-4 text-2xl text-white shadow-md"
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
        className="rounded-md border-2  border-white bg-zinc-800 p-4 text-2xl text-white shadow-md"
        onClick={() => {
          setShowOptions((showOptions) => !showOptions);
          setIsDeleting(false);
        }}
        animate={showOptions ? { rotate: 90 } : { rotate: 0 }}
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
        className="rounded-md border-2 border-white bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-2xl text-white shadow-md"
      >
        <input
          ref={uploadInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            // Open modal and add files
            setIsOpenUploadModal(true);
            addFilesToUpload(e.target?.files);
          }}
        />
        <FaPlus />
      </motion.button>
    </motion.div>
  );
};
