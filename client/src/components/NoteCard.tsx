import { FaCheck, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { DeletableCard } from "./DeletableCard";
import { RouterOutput, trpc } from "../utils/trpc";
import { motion, useAnimationControls } from "framer-motion";

export const NoteCard = ({
  note,
}: {
  note: RouterOutput["note"]["list"][number];
}) => {
  const utils = trpc.useContext();

  const mutation = trpc.note.deleteById.useMutation({
    onSuccess: () => {
      utils.note.list.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const clipboardControls = useAnimationControls();
  const checkmarkControls = useAnimationControls();

  return (
    <DeletableCard deleteFn={() => mutation.mutate(note.id)}>
      <div className="relative min-h-0 flex-grow bg-zinc-800 p-2 text-white">
        <button
          onClick={async () => {
            navigator.clipboard.writeText(note.text);
            clipboardControls.start({ rotate: 360, opacity: 0 });
            await checkmarkControls.start({ rotate: 360, opacity: 1 });

            await checkmarkControls.start({
              opacity: 0,
              transition: { delay: 3 },
            });
            clipboardControls.start({ opacity: 1 });
            clipboardControls.set({ rotate: 0 });
            checkmarkControls.set({ rotate: 0 });
          }}
          className="absolute bottom-2 right-2 rounded-md bg-zinc-900 p-2 transition duration-200 ease-in hover:bg-zinc-700"
        >
          <motion.div animate={clipboardControls}>
            <FaCopy size={32} />
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={checkmarkControls}
          >
            <FaCheck size={24} />
          </motion.div>
        </button>
        <div className="h-full w-full overflow-auto whitespace-pre-wrap break-words">
          {note.text}
        </div>
      </div>
    </DeletableCard>
  );
};
