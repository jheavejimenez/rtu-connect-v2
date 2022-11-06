import { ApolloClient, ApolloLink, fromPromise, HttpLink, InMemoryCache, toPromise } from '@apollo/client';
import axios from 'axios';

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
  return fromPromise(
    axios(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        variables: {
          request: { refreshToken: localStorage.getItem('refreshToken') }
        }
      })
    })
      .then(({ data }) => {
        const accessToken = data?.data?.refresh?.accessToken;
        const refreshToken = data?.data?.refresh?.refreshToken;
        operation.setContext({
          headers: {
            'x-access-token': `Bearer ${accessToken}`
          }
        });

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return toPromise(forward(operation));
      })
      .catch(() => {
        return toPromise(forward(operation));
      })
  );
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
