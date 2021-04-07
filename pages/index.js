import {
  getPokemonsFetchQuery,
  useLazyQueryGetPokemons,
} from "../src/graphql/getPokemons";
import InfiniteScroll from "react-infinite-scroll-component";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainLayout from "../src/layouts/mainLayout";
import { CardPokemon } from "../src/components/cardPokemon";
import { useEffect, useState, useContext } from "react";
import {
  countTotalOwnedPokemon,
  getMyPokemons,
} from "../src/helpers/pokemonHelper";
import { MyPokemonContext } from "../src/contexts/myPokemonContext";

export default function Home({ pokemons }) {
  const [allPokemons, setAllPokemons] = useState(pokemons.results);
  const [nextOffset, setNextOffset] = useState(pokemons.nextOffset);
  const { myPokemons, handleMyPokemons } = useContext(MyPokemonContext);
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    handleMyPokemons(getMyPokemons());
    setCurrentURL(window.location.href);
  }, []);
  const [getPokemons, { loading }] = useLazyQueryGetPokemons({
    onCompleted: ({ pokemons }) => {
      setNextOffset(pokemons.nextOffset);
      setTimeout(() => {
        setAllPokemons((prevResult) => prevResult.concat(pokemons.results));
      }, 1000);
    },
  });

  return (
    <>
      <MainLayout currentURL={currentURL}>
        <h1 style={{ fontSize: 0 }}>Pokemon Deck By Fajrin</h1>
        <InfiniteScroll
          dataLength={allPokemons.length}
          next={() => {
            return getPokemons({
              variables: {
                limit: 10,
                offset: nextOffset,
              },
            });
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              margin: 100px 0;
              overflow: auto;
            `}
          >
            {allPokemons.map((pokemon, i) => {
              return (
                <CardPokemon
                  key={i}
                  name={pokemon.name}
                  image={pokemon.image}
                  id={pokemon.id}
                  totalOwned={countTotalOwnedPokemon(myPokemons, pokemon.name)}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </MainLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  const pokemonListResponse = await getPokemonsFetchQuery({
    limit: 10,
    offset: 0,
  });
  // Pass data to the page via props
  return { props: { pokemons: pokemonListResponse.pokemons } };
};
