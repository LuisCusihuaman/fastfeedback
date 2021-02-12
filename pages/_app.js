import { ProvideAuth } from '../lib/auth';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
