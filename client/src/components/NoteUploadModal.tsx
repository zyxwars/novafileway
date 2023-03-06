import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useStore } from "../store/store";
import { motion } from "framer-motion";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const NoteUploadModal = () => {
  const utils = trpc.useContext();
  const { isOpenNoteModal, setIsOpenNoteModal, setNoteText, noteText } =
    useStore();

  const mutation = trpc.note.add.useMutation({
    onSuccess: () => {
      setIsOpenNoteModal(false);
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <Modal
      isOpen={isOpenNoteModal}
      onClose={() => {
        setNoteText("");
        setIsOpenNoteModal(false);
      }}
    >
      <motion.div
        className="grid h-full w-full grid-flow-row gap-3 bg-zinc-900 p-4 sm:h-5/6 sm:w-4/6  sm:rounded-md"
        style={{ gridTemplateRows: "1fr auto" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <textarea
          className="resize-none rounded-md bg-zinc-800 px-4 py-2 text-white"
          placeholder="Type your note here"
          onChange={(e) => setNoteText(e.target.value)}
          value={noteText}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setIsOpenNoteModal(false);
            }}
            className="rounded-md bg-zinc-800 py-2 px-4 text-lg font-semibold text-white"
          >
            Cancel
          </button>

          <button
            autoFocus
            className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 text-lg font-semibold text-white "
            onClick={() => mutation.mutate({ text: noteText })}
          >
            Upload
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};
