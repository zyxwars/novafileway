import { RouterOutput, trpc } from "../utils/trpc";
import { Loader } from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { NoteCard } from "./NoteCard";
import { FileCard } from "./FileCard";

const isNote = (item: any): item is RouterOutput["note"]["list"][number] => {
  return item?.text !== undefined;
};

export const FilesAndNotes = () => {
  const files = trpc.file.list.useQuery();
  const notes = trpc.note.list.useQuery();

  const orderedFilesAndNotes = useMemo(() => {
    if (!files.data || !notes.data) return [];

    return [...files.data, ...notes.data].sort((a, b) =>
      Number(new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime())
    );
  }, [files.data, notes.data]);

  if (files.isLoading) return <Loader />;
  if (notes.isLoading) return <Loader />;

  if (files.isError) return <div>{files.error.message}</div>;
  if (notes.isError) return <div>{notes.error.message}</div>;

  return (
    <>
      <div
        className="grid h-full w-full auto-rows-[15rem] grid-cols-2 gap-4 justify-self-start overflow-y-auto p-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        // TODO: Media queries, 15 rem
      >
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
    </>
  );
};
