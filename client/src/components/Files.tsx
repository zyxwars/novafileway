import { trpc } from "../utils/trpc";
import testImg from "../assets/react.svg";

export const Files = () => {
  const files = trpc.getFiles.useQuery();

  // if (!files.data) return <div>Loading...</div>;

  return (
    <div className="align-self-start grid h-screen grid-cols-5 gap-4 justify-self-start overflow-y-auto bg-zinc-900 p-4">
      {/* {files.data.map((file) => (
        <div className="font-bold text-violet-800" key={file.id}>
          {file.originalname}
        </div>
      ))} */}
      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>

      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>
      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>
      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>
      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>
      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>
      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>
      <div
        className="grid h-44 grid-flow-row overflow-hidden rounded-md bg-zinc-700"
        style={{ gridTemplateRows: "1fr 2rem" }}
      >
        <img src={testImg} className="h-full w-full object-cover" />
        <div className="bg-zinc-800 text-white">test</div>
      </div>
    </div>
  );
};
