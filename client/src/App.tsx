import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterOutput, trpc } from "./utils/trpc";
import { FileUploadModal } from "./components/FileUploadModal";
import { FilesAndNotes } from "./components/FilesAndNotes";
import { useEffect, useRef, useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { Control } from "./components/Control";
import { NoteUploadModal } from "./components/NoteUploadModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { InfoBar } from "./components/InfoBar";
import { io } from "socket.io-client";

// TODO: Add proper typing for env variables
export const socket = io(import.meta.env.VITE_SERVER_IP);
socket.connect();

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            networkMode: import.meta.env.DEV ? "always" : "online",
          },
          queries: {
            networkMode: import.meta.env.DEV ? "always" : "online",
          },
        },
      })
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: import.meta.env.VITE_SERVER_IP + "/trpc" })],
    })
  );

  console.log(import.meta.env.MODE, import.meta.env.DEV);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Content */}
        <div className="flex h-screen w-full flex-col items-center justify-center bg-zinc-900">
          <InfoBar />
          <FilesAndNotes />
        </div>
        {/* Floating */}
        <Control />
        {/* Modal */}
        <FileUploadModal />
        <NoteUploadModal />
        <ToastContainer
          theme="colored"
          hideProgressBar
          position="bottom-center"
        />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
