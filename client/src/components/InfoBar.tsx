import React from "react";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";
import { trpc } from "../utils/trpc";
import { toast } from "react-toastify";

export const InfoBar = () => {
  const space = trpc.info.diskUsage.useQuery(undefined, {
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="w-full bg-zinc-800">
      {space.data && (
        <div
          className="h-3 bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            width: `${(space.data.usedSpace / space.data.totalSpace) * 100}%`,
          }}
        ></div>
      )}
    </div>
  );
};
