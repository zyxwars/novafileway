import { useState } from "react";
import { motion } from "framer-motion";

export const Upload = () => {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

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
  // };

  const [showUpload, setShowUpload] = useState(false);

  return (
    <>
      <div className="h-64 w-full bg-violet-400">
        <input
          type="file"
          multiple
          // directory=""
          // webkitdirectory=""
          // mozdirectory=""
          onChange={(e) => {
            const fileArray = e.target.files ? Array.from(e.target.files) : [];
            setFilesToUpload(fileArray);
          }}
        />
        <button onClick={() => setShowUpload(true)}>Open upload view</button>
      </div>

      {showUpload && (
        <div className="fixed top-0 left-0 h-screen w-full">
          <div className="h-64 w-full bg-violet-400"></div>
          <motion.div
            className="h-full w-full bg-violet-900"
            initial={{ y: "100vh" }}
            animate={{ y: "0" }}
            exit={{}}
            transition={{ type: "spring", duration: 1 }}
          ></motion.div>
        </div>
      )}
    </>
  );
};
