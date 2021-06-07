import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: '/db/graphql'
});

const wsLink = new WebSocketLink({
  // uri: `ws://${window.location.host}/sockets/graphql`,
  uri: `ws://localhost:8080/graphql`,
  options: {
    reconnect: true,
    lazy: true
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default splitLink;