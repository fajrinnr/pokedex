import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          name
        }
        is_hidden
        slot
      }
      base_experience
      height
      id
      is_default
      location_area_encounters
      name
      order
      species {
        name
      }
      sprites {
        back_default
        back_female
        back_shiny
        back_shiny_female
        front_default
        front_female
        front_shiny
        front_shiny_female
      }
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
      weight
    }
  }
`;

export function useGetPokemon(props) {
  return useQuery(GET_POKEMON, {
    variables: props?.variables,
    onCompleted: props?.onCompleted,
    onError: props?.onError,
  });
}
