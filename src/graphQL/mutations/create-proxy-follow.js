import { gql } from '@apollo/client';

export const CREATE_PROXY_FOLLOW = gql`
  mutation ProxyAction($request: ProxyActionRequest!) {
    proxyAction(request: $request)
  }
`;
