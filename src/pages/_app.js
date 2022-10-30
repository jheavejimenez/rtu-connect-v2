import '../../styles/globals.css';

import { lazy } from 'react';

const Provider = lazy(() => import('../components/Provider'));
const Layout = lazy(() => import('../components/Layout'));

function App({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default App;
