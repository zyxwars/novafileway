import React from "react";
import { FaAngleDown, FaArrowDown } from "react-icons/fa";

export const InfoBar = () => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-4 pt-4 text-center">
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <FaAngleDown />
      </div>
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <h2 className="text-xl font-semibold">Used space</h2>
        <h3>5.7GB</h3>
      </div>
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <h2 className="text-xl font-semibold">System space</h2>
        <h3>9.3/25.6GB</h3>
      </div>
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <h2 className="text-xl font-semibold">Total files</h2>
        <h3>238</h3>
      </div>
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <h2 className="text-xl font-semibold">Total notes</h2>
        <h3>123</h3>
      </div>
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <h2 className="text-xl font-semibold">Temperature</h2>
        <h3>73C</h3>
      </div>
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <h2 className="text-xl font-semibold">Load</h2>
        <h3>0.8 0.7 3</h3>
      </div>
      <div className="flex flex-col items-center justify-center rounded-sm bg-zinc-700 p-4 text-white">
        <h2 className="text-xl font-semibold">Memory</h2>
        <h3>2,9</h3>
      </div>
    </div>
  );
};
