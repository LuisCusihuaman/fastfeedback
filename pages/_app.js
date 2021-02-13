import { AuthProvider } from '../lib/auth';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
