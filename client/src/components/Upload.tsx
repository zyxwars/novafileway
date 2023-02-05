import { useState } from "react";
import { motion } from "framer-motion";

export const Upload = () => {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const [showUpload, setShowUpload] = useState(false);

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

  const handleAddFiles = (files: FileList | null) => {
    const fileArray = files ? Array.from(files) : [];
    setFilesToUpload(fileArray);
  };

  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 right-0 flex flex-col">
        <div className="relative flex h-14 flex-none items-center justify-center rounded-b-xl bg-gradient-to-r from-cyan-500 to-blue-500">
          <input
            className="absolute top-0 left-0 bottom-0 w-full opacity-0"
            type="file"
            multiple
            // directory=""
            // webkitdirectory=""
            // mozdirectory=""
            onChange={(e) => {
              handleAddFiles(e.target?.files);
              setShowUpload(true);
            }}
          />
          <motion.div
            className="font-sans font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            Click to Upload Files
          </motion.div>
        </div>

        {showUpload && (
          <>
            <motion.div
              className="relative flex w-full flex-grow flex-col overflow-y-auto px-4"
              // initial={{ y: "100vh" }}
              // animate={{ y: "0" }}
              // exit={{}}
              // transition={{ type: "spring", duration: 1 }}
            >
              <div className="relative flex w-full flex-grow flex-col overflow-y-auto px-4">
                {filesToUpload.map((file, i) => (
                  <div className="mb-4 flex flex-none items-center rounded-sm bg-zinc-800 p-3 font-semibold text-white first:mt-4">
                    <div className="flex-1">{file.name}</div>
                    <div className="flex-none pl-2">
                      <span className="material-symbols-outlined rounded-sm bg-zinc-900 p-2">
                        close
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex w-full flex-none items-center justify-end bg-zinc-900 p-4 pb-8">
              <button className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-4 px-7 text-lg font-semibold text-white">
                Upload
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
