import { trpc } from "../utils/trpc";

export const Files = () => {
  const files = trpc.getFiles.useQuery();

  if (!files.data) return <div>Loading...</div>;

  return (
    <div>
      {files.data.map((file) => (
        <div className="font-bold text-violet-800" key={file.id}>
          {file.originalname}
        </div>
      ))}
    </div>
  );
};
