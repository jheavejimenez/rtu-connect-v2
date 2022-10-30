import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

import { API_URL } from './constants';

const httpLink = new HttpLink({
  uri: API_URL,
  fetch
});

const authLink = new ApolloLink((operation, forward) => {
  const token = window.sessionStorage.getItem('lensToken');
  console.log('jwt token:', token);

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
