import { RouterOutput, trpc } from "../utils/trpc";
import { Loader } from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { NoteCard } from "./NoteCard";
import { FileCard } from "./FileCard";
import { FaSadCry, FaSadTear } from "react-icons/fa";
import { useStore } from "../store/store";

const isNote = (item: any): item is RouterOutput["note"]["list"][number] => {
  return item?.text !== undefined;
};

export const FilesAndNotes = () => {
  const files = trpc.file.list.useQuery();
  const notes = trpc.note.list.useQuery();
  const { setIsFilesAndNotesEmpty } = useStore();

  const orderedFilesAndNotes = useMemo(() => {
    if (!files.data || !notes.data) return [];

    return [...files.data, ...notes.data].sort((a, b) =>
      Number(new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime())
    );
  }, [files.data, notes.data]);

  useEffect(() => {
    // If length is 0 set to true
    setIsFilesAndNotesEmpty(!orderedFilesAndNotes.length);
  }, [orderedFilesAndNotes]);

  if (files.isLoading) return <Loader />;
  if (notes.isLoading) return <Loader />;

  if (files.isError) return <div>{files.error.message}</div>;
  if (notes.isError) return <div>{notes.error.message}</div>;

  return (
    <>
      <AnimatePresence>
        {orderedFilesAndNotes.length === 0 ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex flex-grow flex-col items-center justify-center gap-4 text-zinc-700"
          >
            <FaSadTear size={128} />
            <div className="text-xl font-semibold">Nothing uploaded</div>
          </motion.div>
        ) : (
          <div className="grid h-full w-full border-spacing-2 auto-rows-[15rem] grid-cols-2 gap-4 justify-self-start overflow-y-auto p-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            <AnimatePresence>
              {orderedFilesAndNotes.map((item) =>
                isNote(item) ? (
                  <NoteCard key={item.id + item.createdAt} note={item} />
                ) : (
                  <FileCard key={item.id + item.createdAt} file={item} />
                )
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
