import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { UploadModal } from "./components/UploadModal";
import { Files } from "./components/Files";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { Control } from "./components/Control";
import { NoteModal } from "./components/NoteModal";

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
          <Files />
        </div>
        {/* Floating */}
        <Control />
        {/* Modal */}
        <UploadModal />
        <NoteModal />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
