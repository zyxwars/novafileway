import {
  FaFile,
  FaBook,
  FaFilePdf,
  FaCode,
  FaHtml5,
  FaCss3,
  FaJs,
  FaPython,
  FaClipboard,
  FaCopy,
  FaCopyright,
  FaRegCopy,
} from "react-icons/fa";
import { BsSoundwave, BsTextLeft } from "react-icons/bs";
import { TbBinary } from "react-icons/tb";
import { trpc } from "../utils/trpc";
import { Loader } from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../utils/store/store";
import { toast } from "react-toastify";
import { useMemo } from "react";

const getFileIcon = (filename: string, mimetype: string) => {
  const size = 64;

  switch (filename.split(".").pop()) {
    case "pdf":
      return <FaFilePdf size={size} />;
    case "html":
      return <FaHtml5 size={size} />;
    case "css":
      return <FaCss3 size={size} />;
    case "js":
      return <FaJs size={size} />;
    case "py":
      return <FaPython size={size} />;
    case "c":
      return <FaCode size={size} />;
    case "zip" || "rar" || "gz" || "tar":
      return <FaBook size={size} />;
    default:
      switch (mimetype.split("/").shift()) {
        case "text":
          return <BsTextLeft size={size} />;
        case "audio":
          return <BsSoundwave size={size} />;

        default:
          if (filename.includes(".")) return <FaFile size={size} />;
          return <TbBinary size={size} />;
      }
  }
};

export const FilesAndNotes = () => {
  const utils = trpc.useContext();

  const { isDeleting } = useStore();

  const files = trpc.file.list.useQuery();
  const notes = trpc.note.list.useQuery();

  const deleteMutation = trpc.file.deleteById.useMutation({
    onSuccess: () => {
      utils.file.list.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const filesAndNotes = useMemo(() => {
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
          {filesAndNotes.map((item) => {
            return (
              <motion.div
                className="flex flex-col overflow-hidden rounded-sm  bg-zinc-800  text-white"
                key={item.id + item.createdAt}
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
                        //TODO: file vs note depending on type
                        if (item.type === "file")
                          deleteMutation.mutate(item.id);
                        else if (item.type === "note")
                          // TODO: Delete note
                          return;
                      }}
                      className="flex flex-none items-center justify-center overflow-hidden bg-red-500  font-bold hover:bg-red-400"
                      initial={{ height: "0" }}
                      animate={{ height: "3rem" }}
                      exit={{ height: "0" }}
                    >
                      Delete
                    </motion.button>
                  )}
                </AnimatePresence>
                {item.type === "note" ? (
                  <div className="relative flex-grow bg-zinc-800 p-2 text-white">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.text);
                        toast("Text copied!", { autoClose: 1000 });
                      }}
                      className="rigth-2 absolute right-2 rounded-md p-2"
                      style={{ background: "rgba(0, 0, 0, 0.25)" }}
                    >
                      <FaCopy size={32} />
                    </button>
                    <div className="h-full w-full overflow-auto whitespace-pre">
                      {item.text}
                    </div>
                  </div>
                ) : (
                  item.type === "file" && (
                    <>
                      <a
                        href={`${import.meta.env.VITE_FILE_SERVER}/upload/${
                          item.id
                        }`}
                        target="_blank"
                        className="flex min-h-0 flex-auto items-center justify-center  bg-zinc-700 text-white"
                      >
                        {item.mimetype.includes("image") ? (
                          <img
                            className="h-full w-full  object-cover"
                            src={`${import.meta.env.VITE_FILE_SERVER}/upload/${
                              item.id
                            }`}
                          />
                        ) : (
                          getFileIcon(item.name, item.mimetype)
                        )}
                      </a>
                      <div
                        className="whitespace-nowrap+ w-full flex-none overflow-hidden text-ellipsis whitespace-nowrap bg-zinc-800 p-4  text-sm font-semibold"
                        // style={{ wordBreak: "break-all" }}
                      >
                        {item.name}
                      </div>
                    </>
                  )
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};
