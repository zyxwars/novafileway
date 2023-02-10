import React, { ComponentPropsWithoutRef, useState } from "react";
import { FaEllipsisH, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../utils/store";

export const Control = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { setIsOpenUploadModal, setIsOpenNoteModal } = useStore();

  return (
    <motion.div
      className="fixed bottom-8 right-6 flex flex-col gap-4"
      // TODO: Fix the stagger
      animate={{ transition: { staggerChildren: 0.5 } }}
    >
      <AnimatePresence>
        {showOptions && (
          <>
            <motion.button
              className="rounded-md bg-gradient-to-r from-pink-500 to-red-500 p-4 text-2xl text-white"
              initial={{ opacity: 0, y: "100px" }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FaTrash />
            </motion.button>
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
      <motion.button
        className="rounded-md bg-zinc-800 p-4 text-2xl text-white"
        onClick={() => setShowOptions((showOptions) => !showOptions)}
        animate={showOptions ? { rotate: 90 } : { rotate: 0 }}
      >
        <FaEllipsisH />
      </motion.button>
      <motion.button
        onClick={() => {
          setIsOpenUploadModal(true);
        }}
        className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-2xl text-white"
      >
        <FaPlus />
      </motion.button>
    </motion.div>
  );
};
