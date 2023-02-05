import { trpc } from "../utils/trpc";

export const Files = () => {
  const files = trpc.getFiles.useQuery();

  // if (!files.data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 gap-4 pt-14">
      {/* {files.data.map((file) => (
        <div className="font-bold text-violet-800" key={file.id}>
          {file.originalname}
        </div>
      ))} */}
      <div className="h-64 rounded-md bg-zinc-800"></div>
      <div className="h-64 rounded-md bg-zinc-800"></div>
      <div className="h-64 rounded-md bg-zinc-800"></div>
      <div className="h-64 rounded-md bg-zinc-800"></div>
      <div className="h-64 rounded-md bg-zinc-800"></div>
      <div className="h-64 rounded-md bg-zinc-800"></div>
      <div className="h-64 rounded-md bg-zinc-800"></div>
    </div>
  );
};
