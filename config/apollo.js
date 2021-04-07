import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider as ApolloProviderClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
export default withApollo(
  () => {
    return new ApolloClient({
      uri: "https://graphql-pokeapi.vercel.app/api/graphql",
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
        <ApolloProviderClient client={props.apollo}>
          <ApolloProvider client={props.apollo}>
            <Page {...props} />
          </ApolloProvider>
        </ApolloProviderClient>
      );
    },
  }
);
