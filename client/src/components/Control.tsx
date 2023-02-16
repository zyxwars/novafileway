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

export const Control = () => {
  const utils = trpc.useContext();
  const [showOptions, setShowOptions] = useState(false);
  const { setIsOpenUploadModal, setIsOpenNoteModal, addFilesToUpload } =
    useStore();
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

  const filesDeleteAllMutation = trpc.filesDeleteAll.useMutation({
    onSuccess: () => utils.files.invalidate(),
  });

  return (
    <motion.div
      className="fixed bottom-8 right-6 flex flex-col gap-4"
      // TODO: Fix the stagger
      animate={{ transition: { staggerChildren: 0.5 } }}
    >
      <AnimatePresence>
        {showOptions && (
          <>
            {/* Delete all */}
            <motion.button
              className="rounded-md bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-2xl text-white"
              initial={{ opacity: 0, y: "100px" }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                if (
                  confirm(
                    "Are you certain you want to delete all upload files!"
                  )
                )
                  filesDeleteAllMutation.mutate();
              }}
            >
              <FaBiohazard />
            </motion.button>
            {/* TODO: Delete */}
            <motion.button
              className="rounded-md bg-gradient-to-r from-pink-500 to-red-500 p-4 text-2xl text-white"
              initial={{ opacity: 0, y: "100px" }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaTrash />
            </motion.button>
            {/* Notes */}
            <motion.button
              onClick={() => {
                setIsOpenNoteModal(true);
              }}
              className="rounded-md bg-gradient-to-r from-yellow-300 to-amber-500 p-4 text-2xl text-white"
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
        className="rounded-md bg-zinc-800 p-4 text-2xl text-white"
        onClick={() => setShowOptions((showOptions) => !showOptions)}
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
        className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-2xl text-white"
      >
        <input
          ref={uploadInputRef}
          type="file"
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
