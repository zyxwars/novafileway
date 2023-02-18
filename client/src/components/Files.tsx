import {
  FaFile,
  FaBook,
  FaFilePdf,
  FaCode,
  FaHtml5,
  FaCss3,
  FaJs,
  FaPython,
} from "react-icons/fa";
import { BsSoundwave, BsTextLeft } from "react-icons/bs";
import { TbBinary } from "react-icons/tb";
import { trpc } from "../utils/trpc";
import { Loader } from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../utils/store/store";
import { toast } from "react-toastify";

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

export const Files = () => {
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
        {notes.data.map((file) => (
          <div className="bg-red-500   text-violet-800" key={file.id}>
            {file.name}
            {file.text}
          </div>
        ))}
        <AnimatePresence>
          {files.data.map((file) => (
            <motion.div
              className="flex flex-col overflow-hidden rounded-sm  bg-zinc-800  text-white"
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
                    className="flex flex-none items-center justify-center overflow-hidden bg-red-500  font-bold hover:bg-red-400"
                    initial={{ height: "0" }}
                    animate={{ height: "3rem" }}
                    exit={{ height: "0" }}
                  >
                    Delete
                  </motion.button>
                )}
              </AnimatePresence>
              <a
                href={`${import.meta.env.VITE_FILE_SERVER}/upload/${file.id}`}
                target="_blank"
                className="flex min-h-0 flex-auto items-center justify-center  bg-zinc-700 text-white"
              >
                {file.mimetype.includes("image") ? (
                  <img
                    className="h-full w-full  object-cover"
                    src={`${import.meta.env.VITE_FILE_SERVER}/upload/${
                      file.id
                    }`}
                  />
                ) : (
                  getFileIcon(file.originalname, file.mimetype)
                )}
              </a>
              <motion.div
                className="whitespace-nowrap+ w-full flex-none overflow-hidden text-ellipsis whitespace-nowrap bg-zinc-800 p-4  text-sm font-semibold"
                // style={{ wordBreak: "break-all" }}
              >
                {file.originalname}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
