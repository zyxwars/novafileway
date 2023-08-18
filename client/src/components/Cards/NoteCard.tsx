import { FaCheck, FaCopy, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { DeletableCard } from "./DeletableCard";
import { RouterOutput, trpc } from "../../utils/trpc";
import { motion, useAnimationControls } from "framer-motion";
import { formatTimeRemaining } from "../../utils/formatting";

export const NoteCard = ({
  note,
}: {
  note: RouterOutput["note"]["list"][number];
}) => {
  const utils = trpc.useContext();

  // TODO: test on slow connection
  const mutation = trpc.note.deleteById.useMutation({
    onMutate: (deletedId) => {
      utils.note.list.setData(
        undefined,
        (utils.note.list.getData() || []).filter(
          (note) => note.id !== deletedId
        )
      );
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const clipboardAnim = useAnimationControls();
  const checkmarkAnim = useAnimationControls();
  const copySequenceAnim = async () => {
    clipboardAnim.set({ opacity: 1 });
    checkmarkAnim.set({ opacity: 0 });
    await clipboardAnim.start({ opacity: 0 });
    await checkmarkAnim.start({ opacity: 1 });
    await checkmarkAnim.start({ opacity: 0, transition: { delay: 3 } });
    clipboardAnim.start({ opacity: 1 });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(note.text);
    copySequenceAnim();
  };

  return (
    <DeletableCard deleteFn={() => mutation.mutate(note.id)}>
      <div className="relative min-h-0 flex-grow bg-zinc-800 p-2 text-white">
        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 rounded-md bg-zinc-900 p-2 transition duration-200 ease-in hover:bg-zinc-700"
        >
          <motion.div animate={clipboardAnim}>
            <FaCopy size={32} />
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={checkmarkAnim}
          >
            <FaCheck size={24} />
          </motion.div>
        </button>
        {/* Delete time */}
        <div className="absolute top-1 left-1 rounded-sm bg-[rgba(0,0,0,0.3)] py-1 px-2">
          <div className="flex items-center gap-1 text-white">
            <FaTrash size={16} />
            <div>
              {formatTimeRemaining(
                new Date(note.deleteAt).getTime() - new Date().getTime()
              )}
            </div>
          </div>
        </div>
        {/* Content */}
        {/*// TODO: Don't hard code padding*/}
        <div className="h-full w-full overflow-auto whitespace-pre-wrap break-words pt-8">
          {note.text}
        </div>
      </div>
    </DeletableCard>
  );
};
