import React, { useEffect } from "react";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";
import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { socket } from "../App";

export const InfoBar = () => {
  const diskUsage = trpc.info.diskUsage.useQuery(undefined, {
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  useEffect(() => {
    socket.on("filesMutated", () => {
      diskUsage.refetch();
    });

    socket.on("notesMutated", () => {
      diskUsage.refetch();
    });

    return () => {
      socket.off("filesMutated");
      socket.off("notesMutated");
    };
  }, []);

  return (
    <div className="w-full bg-zinc-800">
      {diskUsage.data && (
        <motion.div
          className="h-1 rounded-r-sm bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            width: `${
              (diskUsage?.data?.usedSpace / diskUsage?.data?.totalSpace) * 100
            }%`,
          }}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
        ></motion.div>
      )}
    </div>
  );
};
