import { motion, AnimatePresence } from "framer-motion";
import React, { PropsWithChildren } from "react";
import { useStore } from "../store/store";
import { toast } from "react-toastify";
import { UndoDeleteToast } from "./UndoDeleteToast";

export const DeletableCard = ({
  children,
  deleteFn,
}: { deleteFn: () => any } & PropsWithChildren) => {
  const { isDeleting } = useStore();

  return (
    <motion.div
      className="flex flex-col overflow-hidden rounded-sm  bg-zinc-800  text-white"
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      // TODO: Change layout transition duration
      transition={{ duration: 0.1 }}
    >
      <AnimatePresence>
        {isDeleting && (
          <motion.button
            onClick={() =>
              toast(UndoDeleteToast, {
                hideProgressBar: false,
                theme: "dark",
              })
            }
            className="flex flex-none items-center justify-center overflow-hidden bg-red-500  font-bold hover:bg-red-400"
            initial={{ height: "0" }}
            animate={{ height: "3rem" }}
            exit={{ height: "0" }}
          >
            Delete
          </motion.button>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
};
