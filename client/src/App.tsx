import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { FaPen } from "react-icons/fa";

import { UploadModal } from "./components/UploadModal";
import { Files } from "./components/Files";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import {
  CompactUploadInput,
  HEADER_SIZE,
} from "./components/CompactUploadInput";
import { Control } from "./components/Control";

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
        <Files />
        <Control />
        <UploadModal />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
