import React from "react";
import { motion } from "framer-motion";

export const CompactUploadInput = () => {
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
          // handleAddFiles(e.target?.files);
          // setShowUpload(true);
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
  );
};
