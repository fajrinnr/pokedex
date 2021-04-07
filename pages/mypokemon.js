import { useContext, useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MainLayout from "../src/layouts/mainLayout";
import { CardPokemonWithButton } from "../src/components/cardPokemon";
import { getMyPokemons, releasePokemon } from "../src/helpers/pokemonHelper";
import { useRouter } from "next/router";
import { MyPokemonContext } from "../src/contexts/myPokemonContext";

export default function MyPokemon() {
  const router = useRouter();
  const { myPokemons, handleMyPokemons } = useContext(MyPokemonContext);
  const [currentURL, setCurrentURL] = useState("");
  useEffect(() => {
    handleMyPokemons(getMyPokemons());
    setCurrentURL(window.location.href);
  }, []);
  const styles = {
    container: css`
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 100px 0;
      overflow: auto;
    `,
  };
  return (
    <>
      {!myPokemons ? (
        <h2>Loading...</h2>
      ) : (
        <MainLayout currentURL={currentURL}>
          <h1 style={{ fontSize: 0 }}>My Pokemon Result of catching pokemon</h1>
          <div css={styles.container}>
            {myPokemons.map((pokemon, i) => {
              console.log(pokemon);
              return (
                <CardPokemonWithButton
                  key={i}
                  name={pokemon.name}
                  image={pokemon.image}
                  nickname={pokemon.nickname}
                  id={pokemon.id}
                  withButton
                  onClickButton={() =>
                    releasePokemon(pokemon.nickname, () => {
                      router.reload();
                    })
                  }
                />
              );
            })}
          </div>
        </MainLayout>
      )}
    </>
  );
}
