import '../../styles/globals.css';

import Layout from '../components/Layout';
import Provider from '../components/Provider';

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
