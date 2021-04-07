import { useContext, useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import Image from "next/image";

import MainLayout from "../src/layouts/mainLayout";
import { CardPokemonWithButton } from "../src/components/cardPokemon";
import { getMyPokemons, releasePokemon } from "../src/helpers/pokemonHelper";
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
    loadingContainer: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 80vh;
      color: white;
    `,
    loadingText: css`
      font-weight: 700;
    `,
  };
  if (!myPokemons) {
    return (
      <div css={styles.loadingContainer}>
        <Image
          src="/pikachu-run.gif"
          width={150}
          height={150}
          alt="pikachu run"
        />
        <p css={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <MainLayout currentURL={currentURL}>
      {myPokemons.length === 0 ? (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 80px;
          `}
        >
          <p
            css={css`
              width: 70%;
              text-align: center;
              font-weight: 700;
              color: white;
              font-size: 20px;
            `}
          >
            You haven't caught Pokemon yet, Go catch some!
          </p>
          <Image
            src="/pokemon-catch.gif"
            alt="pokemon catch"
            width={300}
            height={200}
          />
        </div>
      ) : (
        <>
          <h1 style={{ fontSize: 0 }}>My Pokemon Result of catching pokemon</h1>
          <div css={styles.container}>
            {myPokemons.map((pokemon, i) => {
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
        </>
      )}
    </MainLayout>
  );
}
