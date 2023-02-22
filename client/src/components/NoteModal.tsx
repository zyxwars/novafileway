import React from "react";
import { Modal } from "./Modal";
import { useStore } from "../store/store";
import { motion } from "framer-motion";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";

type FormData = {
  text: string;
};

const defaultName = "My note";

export const NoteModal = () => {
  const utils = trpc.useContext();
  const { isOpenNoteModal, setIsOpenNoteModal } = useStore();

  const mutation = trpc.note.add.useMutation({
    onSuccess: () => {
      utils.note.list.invalidate();
      setIsOpenNoteModal(false);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => mutation.mutate({ ...data }));

  return (
    <Modal isOpen={isOpenNoteModal} onClose={() => setIsOpenNoteModal(false)}>
      <motion.form
        className="grid h-full w-full grid-flow-row gap-3 bg-zinc-900 p-4 sm:h-5/6 sm:w-4/6  sm:rounded-md"
        style={{ gridTemplateRows: "1fr auto" }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmit}
      >
        <textarea
          {...register("text")}
          className="resize-none rounded-md bg-zinc-800 px-4 py-2 text-white"
          placeholder="Type your note here"
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setIsOpenNoteModal(false);
            }}
            className="rounded-md bg-zinc-800 py-2 px-4 text-lg font-semibold text-white"
          >
            Cancel
          </button>

          <button
            autoFocus
            type="submit"
            className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 text-lg font-semibold text-white "
          >
            Upload
          </button>
        </div>
      </motion.form>
    </Modal>
  );
};
