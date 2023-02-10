import React from "react";
import { motion } from "framer-motion";

export const Loader = () => {
  return (
    <motion.div
      initial={{ rotate: 90 }}
      animate={{ rotate: 270 }}
      transition={{
        repeat: Infinity,
        repeatDelay: 1,
        duration: 1,
      }}
    >
      <motion.div
        className="h-10 w-10 rounded-full bg-zinc-800"
        animate={{ margin: 10 }}
      ></motion.div>
      <motion.div
        className="h-10 w-10 rounded-full bg-zinc-800"
        animate={{ margin: 10 }}
      ></motion.div>
      <motion.div
        className="h-10 w-10 rounded-full bg-zinc-800"
        animate={{ margin: 10 }}
      ></motion.div>
    </motion.div>
  );
};
