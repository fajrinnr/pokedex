/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { formatIdNumber, formatStringFromString } from "../helpers/formatter";
import { useAmp } from "next/amp";
import { Pill } from "./pill";

const styles = {
  container: css`
    background-color: #313a61;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 20px;
    padding: 10px;
  `,
  content: css`
    display: flex;
    width: 100%;
    cursor: pointer;
    align-items: center;
  `,
  dataContent: css`
    color: #e9ebef;
    margin: 0 0 0 10px;
    width: 100%;
  `,
  bigText: css`
    font-weight: 700;
    font-size: 25px;
    letter-spacing: 1px;
    margin: 0;
  `,
  totalOwnedText: css`
    margin: 0;
  `,
  idNumberText: css`
    margin: 0;
    font-size: 30px;
    color: #e9ebef;
    opacity: 0.3;
    font-weight: 700;
    text-align: right;
  `,
  idNumberTextSmall: css`
    margin: 0;
    font-size: 15px;
    color: #e9ebef;
    opacity: 0.3;
    font-weight: 700;
  `,
  containerButton: css`
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    margin-top: 5px;
    border-top: 2px solid #686f8b;
  `,
  wrapper: css`
    display: flex;
    width: 100%;
    cursor: pointer;
    flex-direction: column;
  `,
};

export function CardPokemon(props) {
  const isAmp = useAmp();
  return (
    <div css={styles.container}>
      <Link href={`/pokemon-details/${props.name}`} shallow>
        <div css={styles.content}>
          {isAmp ? (
            <amp-img
              src={props.image}
              width="96"
              height="96"
              layout="responsive"
              alt={props.name}
            ></amp-img>
          ) : (
            <img src={props.image} loading="lazy" alt={props.name} />
          )}
          <div css={styles.dataContent}>
            <p css={styles.bigText}>{formatStringFromString(props.name)}</p>
            <p css={styles.totalOwnedText}>Total owned: {props.totalOwned}</p>
            <p css={styles.idNumberText}>{formatIdNumber(props.id)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function CardPokemonWithButton(props) {
  const isAmp = useAmp();
  return (
    <div css={styles.container}>
      <div css={styles.wrapper}>
        <Link href={`/pokemon-details/${props.name}`} shallow>
          <div css={styles.content}>
            {isAmp ? (
              <amp-img
                src={props.image}
                width="96"
                height="96"
                layout="responsive"
                alt={props.name}
              ></amp-img>
            ) : (
              <Image
                src={props.image}
                loading="lazy"
                width={96}
                height={96}
                alt={props.name}
              />
              // <img src={props.image} loading="lazy" alt={props.name} />
            )}
            <div css={styles.dataContent}>
              <p css={styles.bigText}>
                {formatStringFromString(props.nickname)}
              </p>
              <p css={styles.totalOwnedText}>
                {formatStringFromString(props.name)}
              </p>
              <p css={styles.idNumberTextSmall}>{formatIdNumber(props.id)}</p>
            </div>
          </div>
        </Link>
        <div css={styles.containerButton}>
          {props.withButton && (
            <Pill
              text="Release"
              onClickPill={() => props.onClickButton()}
              customeStyles={{ container: "height: 33px;" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
