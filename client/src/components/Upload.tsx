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
      <div className="h-64">
        <input
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
        <button onClick={() => setShowUpload(true)}>Open upload view</button>
      </div>

      {showUpload && (
        <div className="fixed left-0 top-0 bottom-0 flex flex-col">
          <div className="h-64 border-8 ">
            <input
              type="file"
              multiple
              // directory=""
              // webkitdirectory=""
              // mozdirectory=""
              onChange={(e) => {
                handleAddFiles(e.target?.files);
              }}
            />
          </div>
          <motion.div
            className="grid flex-grow grid-cols-6 gap-4 overflow-y-auto  p-4"
            initial={{ y: "100vh" }}
            animate={{ y: "0" }}
            exit={{}}
            transition={{ type: "spring", duration: 1 }}
          >
            {filesToUpload.map((file, i) => (
              <motion.div className="h-64 bg-neutral-800 outline outline-1">
                {file.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
};
