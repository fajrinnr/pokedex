/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const Pill = (props) => {
  const styles = {
    container: css`
      background-color: #f7ba16;
      padding: 5px 20px;
      border-radius: 20px;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.14);
      ${props.customStyles?.container}
    `,
    elementP: css`
      margin: 0;
      font-weight: 700;
      color: black;
      ${props.customStyles?.elementP}
    `,
  };

  return (
    <div css={styles.container}>
      <p css={styles.elementP} onClick={props.onClickPill}>
        {props.text}
      </p>
    </div>
  );
};
