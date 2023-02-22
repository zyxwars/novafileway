import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { FileUploadModal } from "./components/FileUploadModal";
import { FilesAndNotes } from "./components/FilesAndNotes";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { Control } from "./components/Control";
import { NoteUploadModal } from "./components/NoteUploadModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      links: [
        httpBatchLink({ url: import.meta.env.VITE_TRPC_SERVER + "/trpc" }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Content */}
        <div className="flex h-screen w-full items-center justify-center bg-zinc-900">
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
