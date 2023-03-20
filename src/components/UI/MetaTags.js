import Head from 'next/head';

import { APP_NAME } from '../../utils/constants';

function MetaTags({ tile, description }) {
  return (
    <Head>
      <title>{tile}</title>
      <meta name={'description'} content={description} />
      <meta
        name={'viewport'}
        content={'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'}
      />
      <meta property={'og:site_name'} content={APP_NAME} />
      <meta name={'google-site-verification'} content={'vAmxJzTAYmPpt0cMbtrk1570d3I9cLRmqay9ohc4h3w'} />
      <meta property={'og:description'} content={description} />
    </Head>
  );
}

export default MetaTags;
