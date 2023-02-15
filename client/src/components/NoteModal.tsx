import React from "react";
import { Modal } from "./Modal";
import { useStore } from "../utils/store/store";
import { motion } from "framer-motion";

export const NoteModal = () => {
  const { isOpenNoteModal, setIsOpenNoteModal } = useStore();

  return (
    <Modal isOpen={isOpenNoteModal} onClose={() => setIsOpenNoteModal(false)}>
      <motion.div
        className="grid h-full w-full grid-flow-row gap-6 bg-zinc-900 p-8 sm:h-5/6 sm:w-4/6  sm:rounded-md"
        style={{ gridTemplateRows: "auto 1fr auto" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          className="rounded-md bg-zinc-800 px-4 py-2 text-white"
          type="text"
          placeholder="My note"
        />
        {/* TODO: Disable resizing */}
        <textarea
          className="rounded-md bg-zinc-800 px-4 py-2 text-white"
          placeholder="Type your note here"
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => {}}
            className="rounded-md bg-zinc-800 py-2 px-4 text-lg font-semibold text-white"
          >
            Cancel
          </button>

          <button className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 text-lg font-semibold text-white ">
            Upload
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};
