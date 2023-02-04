import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";

import { Upload } from "./components/Upload";
import { Files } from "./components/Files";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";

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
        <div className="h-screen w-full bg-zinc-900">
          <Upload />
          <Files />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
