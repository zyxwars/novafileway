import { FaFilePdf } from "react-icons/fa";
import { trpc } from "../utils/trpc";
import { Loader } from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../utils/store/store";

export const Files = () => {
  const utils = trpc.useContext();

  const { isDeleting } = useStore();

  const files = trpc.file.list.useQuery();
  const notes = trpc.note.list.useQuery();

  const deleteMutation = trpc.file.deleteById.useMutation({
    onSuccess: () => {
      utils.file.list.invalidate();
    },
  });

  if (files.isLoading) return <Loader />;
  if (notes.isLoading) return <Loader />;

  if (files.isError) return <div>{files.error.message}</div>;
  if (notes.isError) return <div>{notes.error.message}</div>;
  return (
    <>
      <div
        className="grid h-full w-full grid-cols-4 gap-4 justify-self-start overflow-y-auto p-4"
        // TODO: Fix height
        style={{ gridTemplateRows: "14rem" }}
      >
        {notes.data.map((file) => (
          <div className="bg-red-500 font-bold text-violet-800" key={file.id}>
            {file.name}
            {file.text}
          </div>
        ))}
        <AnimatePresence>
          {files.data.map((file) => (
            <motion.div
              className="flex flex-col overflow-hidden rounded-sm bg-zinc-800 font-bold text-white"
              key={file.id}
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
                    onClick={() => {
                      deleteMutation.mutate(file.id);
                    }}
                    className="flex items-center justify-center overflow-hidden bg-red-500"
                    initial={{ height: "0" }}
                    animate={{ height: "3rem" }}
                    exit={{ height: "0" }}
                  >
                    Delete
                  </motion.button>
                )}
              </AnimatePresence>
              <div className="flex flex-grow items-center justify-center bg-zinc-700 text-white">
                <FaFilePdf size={64} />
              </div>
              <div
                className="flex-none bg-zinc-800 p-4"
                style={{ wordBreak: "break-all" }}
              >
                {file.originalname}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
