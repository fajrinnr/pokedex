/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";

const styles = {
  container: css`
    display: flex;
    position: fixed;
    bottom: 0;
    background-color: #353d64;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.14);
    width: 100%;
    border-radius: 20px 20px 0 0;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    z-index: 10;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  `,
  textMenuBar: css`
    font-weight: 700;
    font-style: normal;
    color: white;
    text-align: center;
    margin: 0;
    margin-top: 7px;
    font-size: 11px;
  `,
};

export default function MenuBar(props) {
  return (
    <div data-testid="container-link" css={styles.container}>
      <Link id="pokemon-list-link" href="/">
        <div css={styles.content}>
          <Image width={50} height={50} src="/pikachu.svg" alt="Pikachu" />
          <p css={styles.textMenuBar}>Pokemon List</p>
        </div>
      </Link>
      <Link href="/mypokemon">
        <div css={styles.content} data-testid="my-pokemon-link">
          <Image width={50} height={50} src="/pokeballs.svg" alt="Poke Ball" />
          <p css={styles.textMenuBar}>My Pokemon</p>
        </div>
      </Link>
    </div>
  );
}
