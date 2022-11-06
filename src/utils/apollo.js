import { ApolloClient, ApolloLink, fromPromise, HttpLink, InMemoryCache } from '@apollo/client';

import { API_URL } from './constants';
import { clearLocalStorage, isTokenExpired } from './helpers';

const httpLink = new HttpLink({
  uri: API_URL,
  fetch
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('jwt token:', accessToken);

  if (accessToken === 'undefined') {
    clearLocalStorage(['accessToken', 'refreshToken']);
    return forward(operation);
  }
  const isExpiring = isTokenExpired(accessToken);

  if (!isExpiring) {
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
      }
    });
    // Call the next link in the middleware chain.
    return forward(operation);
  }
  // this is where we get the new access token
  return fromPromise();
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
