import { useState } from "react";
import { Upload } from "./components/Upload";
import { QueryClient, QueryClientProvider } from "react-query";
import { Files } from "./components/Files";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Upload />
        <Files />
      </div>
    </QueryClientProvider>
  );
}

export default App;
