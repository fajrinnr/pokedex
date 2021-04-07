import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
export default withApollo(
  () => {
    return new ApolloClient({
      uri: process.env.GRAPHQL_URL,
      cache: new InMemoryCache(),
      onError: ({ networkError, graphQLErrors }) => {
        graphQLErrors && console.log("⚛️ GraphQl Error ⚛️", graphQLErrors);
        networkError && console.log("👮🏻‍♀️ network error", networkError);
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
