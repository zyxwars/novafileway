import { trpc } from "../utils/trpc";
import { Loader } from "./Loader";

export const Files = () => {
  const files = trpc.getFiles.useQuery();

  if (!files.data) return <Loader />;

  return (
    <div className="align-self-start grid h-full w-full grid-cols-5 gap-4 justify-self-start overflow-y-auto p-4">
      {files.data.map((file) => (
        <div className="font-bold text-violet-800" key={file.id}>
          {file.originalname}
        </div>
      ))}
    </div>
  );
};
