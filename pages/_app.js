import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }) {
  var testing = 0;
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
