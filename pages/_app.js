import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth';
import customTheme from '@/styles/theme';
import { Global, css } from '@emotion/react';

const GlobalStyle = () => (
  <Global
    styles={css`
      html {
        min-width: 360px;
        scroll-behavior: smooth;
      }
      #__next {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
    `}
  />
);

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <GlobalStyle />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
