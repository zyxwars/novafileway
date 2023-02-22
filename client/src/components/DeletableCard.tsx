import { motion, AnimatePresence } from "framer-motion";
import React, { PropsWithChildren, useState } from "react";
import { useStore } from "../store/store";
import { toast } from "react-toastify";

export const DeletableCard = ({
  children,
  deleteFn,
}: { deleteFn: () => any } & PropsWithChildren) => {
  const { isDeleting } = useStore();
  const [isAlreadyDeleted, setIsAlreadyDeleted] = useState(false);

  return (
    <motion.div
      className="flex flex-col rounded-sm  bg-zinc-800  text-white"
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
            // Disable multi delete while animation is still playing
            // If undo is ever added this will need to be reworked a bit
            disabled={isAlreadyDeleted}
            onClick={() => {
              deleteFn();
              setIsAlreadyDeleted(true);
            }}
            className="ease flex flex-none items-center justify-center overflow-hidden bg-red-500 font-bold transition duration-200 hover:bg-red-400 disabled:bg-red-600"
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
