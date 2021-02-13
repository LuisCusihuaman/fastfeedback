import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth';
import customTheme from '@/styles/theme';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
