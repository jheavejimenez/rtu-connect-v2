import { ChakraProvider } from '@chakra-ui/react';

function App({ Component }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
