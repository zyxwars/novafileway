import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

import { Upload } from "./components/Upload";
import { Files } from "./components/Files";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <div className="w-full min-h-screen bg-slate-100 grid grid-flow-row">
          <div className="bg-orange-500 h-full w-full"></div>
          <div className="bg-blue-500 h-full w-full"></div>
          {/* <Upload />
          <Files /> */}
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
