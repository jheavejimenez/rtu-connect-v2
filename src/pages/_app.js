import '../../styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { lazy, Suspense } from 'react';

import Loading from '../components/Shimmer/Loading';

const Provider = lazy(() => import('../components/Provider'));
const Layout = lazy(() => import('../components/Layout'));

function App({ Component, pageProps }) {
  return (
    <Suspense fallback={<Loading />}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </Provider>
    </Suspense>
  );
}

export default App;
