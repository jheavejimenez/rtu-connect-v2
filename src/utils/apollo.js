import { ApolloClient, ApolloLink, fromPromise, HttpLink, InMemoryCache, toPromise } from '@apollo/client';
import axios from 'axios';

import { refresh } from '../graphQL/auth/auth-mutations';
import { API_URL } from './constants';
import { clearLocalStorage, isTokenExpired, publicationKeyFields, setLocalStorage } from './helpers';

const httpLink = new HttpLink({
  uri: API_URL,
  fetchOptions: 'no-cors',
  fetch
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken || accessToken === 'undefined') {
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
        query: refresh,
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
        setLocalStorage(['accessToken', 'refreshToken'], [accessToken, refreshToken]);

        return toPromise(forward(operation));
      })
      .catch(() => {
        return toPromise(forward(operation));
      })
  );
});

function cursorBasedPagination(keyArgs) {
  return {
    keyArgs,
    read(existing = {}, { canRead }) {
      if (!existing) {
        return existing;
      }
      const { items, pageInfo } = existing;
      const removedItems = items?.filter((item) => !canRead(item));

      return {
        ...existing,
        items,
        pageInfo: {
          ...pageInfo,
          totalCount: pageInfo?.totalCount ? pageInfo.totalCount - removedItems?.length : null
        }
      };
    },
    merge(existing = {}, incoming) {
      if (!existing) {
        return incoming;
      }

      const existingItems = existing.items ?? [];
      const incomingItems = incoming.items ?? [];

      return {
        ...incoming,
        items: existingItems?.concat(incomingItems),
        pageInfo: incoming.pageInfo
      };
    }
  };
}

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Post: { keyFields: publicationKeyFields },
      Comment: { keyFields: publicationKeyFields },
      Mirror: { keyFields: publicationKeyFields }
    }
  }),
  connectToDevTools: true
});

export default client;
