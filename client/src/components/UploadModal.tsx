import { AnimatePresence, motion } from "framer-motion";
import { HEADER_SIZE } from "./CompactUploadInput";
import { Modal } from "./Modal";
import { useStore } from "../utils/store";

export const UploadModal = () => {
  // const handleUpload = () => {
  //   filesToUpload.forEach((file) => {
  //     // TODO: get progress

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     axios.postForm("http://127.0.0.1:8080/files", formData, {
  //       onUploadProgress: (e) => {
  //         console.log(e);
  //       },
  //     });
  //   });

  // TODO: Pack into mutation after progress bar is done
  // TODO: Invalidate after await all queries?, use the mutation?

  const { filesToUpload, removeFileToUpload } = useStore();

  return (
    <Modal
      className="pointer-events-none grid grid-flow-row"
      style={{ paddingTop: `${HEADER_SIZE}`, gridTemplateRows: "1fr" }}
      isOpen={filesToUpload.length > 0}
    >
      <motion.div
        className="pointer-events-auto grid min-h-0 grid-flow-row  bg-zinc-900"
        style={{ gridTemplateRows: "1fr auto" }}
        initial={{ y: "100vh" }}
        animate={{ y: "0" }}
        exit={{ y: "100vh" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex w-full flex-grow flex-col overflow-y-auto px-4">
          <AnimatePresence>
            {filesToUpload.map((file, i) => (
              <motion.div
                layout
                key={file.name}
                className="relative mb-4 flex flex-none items-center rounded-sm bg-zinc-800 p-3 font-semibold text-white first:mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <div className="absolute h-full w-1/4 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <div className="z-10 flex-1" style={{ wordBreak: "break-all" }}>
                  {file.name}
                </div>
                <div
                  className="flex-none cursor-pointer pl-2"
                  onClick={() => removeFileToUpload(file)}
                >
                  <span className="material-symbols-outlined rounded-sm bg-zinc-900 p-2">
                    close
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-end border-t border-white bg-zinc-900 p-4">
          <button className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 text-lg font-semibold text-white ">
            Upload
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

{
}
