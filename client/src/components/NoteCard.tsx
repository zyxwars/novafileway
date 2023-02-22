import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { DeletableCard } from "./DeletableCard";
import { RouterOutput, trpc } from "../utils/trpc";

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

  return (
    <DeletableCard deleteFn={() => mutation.mutate()}>
      <div className="relative flex-grow bg-zinc-800 p-2 text-white">
        <button
          onClick={() => {
            navigator.clipboard.writeText(note.text);
            toast("Text copied!", { autoClose: 1000 });
          }}
          className="rigth-2 absolute right-2 rounded-md p-2"
          style={{ background: "rgba(0, 0, 0, 0.25)" }}
        >
          <FaCopy size={32} />
        </button>
        <div className="h-full w-full overflow-auto whitespace-pre">
          {note.text}
        </div>
      </div>
    </DeletableCard>
  );
};
