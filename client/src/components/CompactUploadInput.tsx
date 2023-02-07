import React from "react";
import { motion } from "framer-motion";
import { useStore } from "../utils/store";

export const HEADER_SIZE = "3.5rem";

export const CompactUploadInput = () => {
  const { addFilesToUpload, filesToUpload } = useStore();

  return (
    <div className="relative flex flex-none items-center justify-center rounded-b-xl bg-gradient-to-r from-cyan-500 to-blue-500">
      <input
        className="absolute top-0 left-0 bottom-0 w-full opacity-0"
        type="file"
        multiple
        // directory=""
        // webkitdirectory=""
        // mozdirectory=""
        onChange={(e) => {
          addFilesToUpload(e.target?.files);
        }}
      />
      <motion.div
        className="font-sans font-bold text-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {filesToUpload.length > 0
          ? "Add more files"
          : "Click or drag a File here"}
      </motion.div>
    </div>
  );
};
