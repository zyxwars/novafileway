import { trpc } from "../utils/trpc";

export const Files = () => {
  const files = trpc.getFiles.useQuery();

  if (!files.data) return <div>Loading...</div>;

  return (
    <div className="align-self-start grid h-screen grid-cols-5 gap-4 justify-self-start overflow-y-auto bg-zinc-900 p-4">
      {files.data.map((file) => (
        <div className="font-bold text-violet-800" key={file.id}>
          {file.originalname}
        </div>
      ))}
    </div>
  );
};
