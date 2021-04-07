/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";
import { formatIdNumber } from "../helpers/formatter";
import { goBack } from "../helpers/route";

const styles = {
  containerHeader: css`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 13px;
    position: fixed;
    background-color: #282f4d;
    z-index: 10;
    top: 0;
  `,
  containerHeaderPokemonDetail: css`
    display: flex;
    align-items: center;
    padding: 20px 20px 0 20px;
    justify-content: space-between;
  `,
  arrowLeft: css`
    filter: invert(1);
    border: 2px solid !important;
    border-radius: 100px;
    padding: 8px !important;
  `,
  textIdNumber: css`
    margin: 0;
    font-size: 30px;
    color: #e9ebef;
    opacity: 0.5;
    font-weight: 700;
  `,
};

export default function Header() {
  return (
    <div css={styles.containerHeader}>
      <Image width={167} height={60.4} src="/pokedex-logo.png" alt="pokedex" />
    </div>
  );
}

export function HeaderPokemonDetail(props) {
  return (
    <div css={styles.containerHeaderPokemonDetail}>
      <Image
        css={styles.arrowLeft}
        width={40}
        height={40}
        src="/arrow-left-solid.svg"
        alt="arrow left"
        onClick={() => goBack()}
      />
      <p css={styles.textIdNumber}>{formatIdNumber(props.id)}</p>
    </div>
  );
}
