import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";

import { Upload } from "./components/Upload";
import { Files } from "./components/Files";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Upload />
        <Files />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
