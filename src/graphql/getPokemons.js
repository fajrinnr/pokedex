import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { GraphQLClient } from "graphql-request";

const query = /* GraphQL */ `
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      nextOffset
      prevOffset
      params
      results {
        url
        name
        image
        id
      }
      status
      message
    }
  }
`;

export const GET_POKEMONS = gql`
  ${query}
`;

export async function getPokemonsFetchQuery(variables) {
  const graphQLClient = new GraphQLClient(process.env.GRAPHQL_URL);

  const data = await graphQLClient.request(query, variables);
  return data;
}

export function useLazyQueryGetPokemons({ onCompleted, onError }) {
  return useLazyQuery(GET_POKEMONS, {
    onCompleted,
    onError,
  });
}
