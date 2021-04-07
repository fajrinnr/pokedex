import { getPokemonFetchQuery } from "../../src/graphql/getPokemon";
import MainLayout from "../../src/layouts/mainLayout";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  catchPokemon,
  countTotalStatsPokemon,
} from "../../src/helpers/pokemonHelper";
import {
  formatStringFromArray,
  formatStringFromString,
} from "../../src/helpers/formatter";
import { useAmp } from "next/amp";
import { Pill } from "../../src/components/pill";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const config = { amp: "hybrid" };

const styles = {
  topContainer: css`
    padding: 0 30px;
  `,
  pokemonName: css`
    font-weight: 700;
    color: white;
    font-size: 45px;
    margin: 0 0 7px 0;
  `,
  pokemonTypes: css`
    width: 100%;
    display: flex;
  `,
  textCatchPokemon: css`
    text-align: center;
    margin: 0;
    margin-top: 10px;
    color: #f7ba16;
    font-weight: 700;
  `,
  pokemonImage: css`
    display: flex;
    justify-content: center;
  `,
  bottomComponent: css`
    background-color: #313a61;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    height: 80vh;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 40px;
    color: white;
  `,
  tabsContainer: css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 50px;
  `,
  textTabs: css`
    margin: 0;
    border-bottom: 3px solid #d0d5e2;
    padding-bottom: 10px;
  `,
  contentTab: {
    container: css`
      display: flex;
      width: 100%;
      justify-content: space-around;
      padding: 20px 0;
      flex-direction: column;
    `,
    titleText: css`
      font-weight: bolder;
      font-size: 30px;
      margin: 0;
    `,
    content: css`
      display: flex;
      width: 100%;
      margin: 20px 0;
    `,
  },
};

const ContentTab = (props) => {
  return (
    <div
      css={styles.contentTab.container}
      style={props.customStyles?.container}
    >
      <p css={styles.contentTab.titleText}>{props.titleText}</p>
      <div css={styles.contentTab.content} style={props.customStyles?.content}>
        {props.children}
      </div>
    </div>
  );
};

export default function PokemonDetails({ pokemonData }) {
  const isAmp = useAmp();
  const [pokemonAbility, setPokemonAbility] = useState([]);
  const [currentURL, setCurrentURL] = useState("");
  const [activeTab, setActiveTab] = useState({
    about: true,
    stats: false,
    moves: false,
  });
  useEffect(() => {
    setCurrentURL(window.location.href);
    pokemonData.abilities.forEach(({ ability }) => {
      setPokemonAbility((prevstate) => [...prevstate, ability.name]);
    });
  }, []);

  return (
    <>
      <MainLayout noHeader pokemonId={pokemonData.id} currentURL={currentURL}>
        <div
          css={css`
            font-family: "DM Sans", sans-serif;
          `}
        >
          <div css={styles.topContainer}>
            <h1 css={styles.pokemonName}>
              {formatStringFromString(pokemonData.name)}
            </h1>
            <div css={styles.pokemonTypes}>
              {pokemonData.types.map(({ type }, i) => {
                return (
                  <Pill
                    key={i}
                    text={formatStringFromString(type.name)}
                    customStyles={{ container: `margin-right: 5px;` }}
                  />
                );
              })}
            </div>
            <p css={styles.textCatchPokemon}>Click Image to Catch Pokemon</p>
          </div>
          <Carousel
            emulateTouch
            infiniteLoop
            showArrows={false}
            showStatus={false}
            autoPlay={false}
            onClickItem={() =>
              catchPokemon(
                pokemonData.name,
                pokemonData.sprites.front_default,
                pokemonData.id
              )
            }
            showThumbs={false}
          >
            <Image
              width={200}
              height={200}
              src={pokemonData.sprites.front_default}
              alt={pokemonData.sprites.front_default}
            />
            <Image
              width={200}
              height={200}
              src={pokemonData.sprites.back_default}
              alt={pokemonData.sprites.back_default}
            />
          </Carousel>
          <div css={styles.bottomComponent}>
            <div css={styles.tabsContainer}>
              <Pill
                text="About"
                onClickPill={() =>
                  setActiveTab({ about: true, stats: false, moves: false })
                }
                customStyles={{
                  container: {
                    filter: activeTab.about ? "inherit" : "opacity(0.5)",
                  },
                }}
              />
              <Pill
                text="Stats"
                onClickPill={() =>
                  setActiveTab({ about: false, stats: true, moves: false })
                }
                customStyles={{
                  container: {
                    filter: activeTab.stats ? "inherit" : "opacity(0.5)",
                  },
                }}
              />
              <Pill
                text="Moves"
                onClickPill={() =>
                  setActiveTab({ about: false, stats: false, moves: true })
                }
                customStyles={{
                  container: {
                    filter: activeTab.moves ? "inherit" : "opacity(0.5)",
                  },
                }}
              />
            </div>
            {activeTab.about && (
              <ContentTab
                titleText="About"
                customStyles={{ content: { margin: 0 } }}
              >
                <div
                  css={css`
                    width: 30%;
                    font-weight: 700;
                  `}
                >
                  <p>Height</p>
                  <p>Weight</p>
                  <p>Abilities</p>
                </div>
                <div
                  css={css`
                    width: 70%;
                  `}
                >
                  <p>{(pokemonData.height / 10).toFixed(1)} m</p>
                  <p>{(pokemonData.weight / 10).toFixed(1)} kg</p>
                  <p>{formatStringFromArray(pokemonAbility)}</p>
                </div>
              </ContentTab>
            )}
            {activeTab.stats && (
              <ContentTab
                titleText="Base Stats"
                customStyles={{
                  content: { justifyContent: "space-between", margin: 0 },
                }}
              >
                <div>
                  {pokemonData.stats.map(({ stat }, i) => {
                    return <p key={i}>{formatStringFromString(stat.name)}</p>;
                  })}
                  <p>Total</p>
                </div>
                <div>
                  {pokemonData.stats.map((stat, i) => {
                    return <p key={i}>{stat.base_stat}</p>;
                  })}
                  <p>{countTotalStatsPokemon(pokemonData.stats)}</p>
                </div>
              </ContentTab>
            )}
            {activeTab.moves && (
              <ContentTab
                titleText="Moves"
                customStyles={{
                  container: { height: "70vh", justifyContent: "start" },
                  content: {
                    margin: "20px 0 100px",
                    flexWrap: "wrap",
                    overflow: "auto",
                  },
                }}
              >
                {pokemonData.moves.map(({ move }, i) => {
                  return (
                    <Pill
                      text={formatStringFromString(move.name)}
                      key={i}
                      customStyles={{
                        container: `margin: 0 5px 10px 5px; background-color: #dad7cd;`,
                      }}
                    />
                  );
                })}
              </ContentTab>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const pokemonResponse = await getPokemonFetchQuery({
    name: context.query.name,
  });
  return {
    props: {
      pokemonData: pokemonResponse.pokemon,
    },
  };
};
