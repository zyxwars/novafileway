import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";

import { UploadModal } from "./components/UploadModal";
import { Files } from "./components/Files";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import { CompactUploadInput } from "./components/CompactUploadInput";
import { Modal } from "./components/Modal";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "http://localhost:8080/trpc" })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div
          className="grid h-screen grid-flow-row bg-zinc-900"
          style={{ gridTemplateRows: "3.5rem 1fr" }}
        >
          <CompactUploadInput />
          <Files />
        </div>
      </QueryClientProvider>
      <UploadModal />
    </trpc.Provider>
  );
}

export default App;
