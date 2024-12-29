import React from "react";

import styles from "./styles.module.css";

type Properties = {
  isDisabled?: boolean;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const Button = ({
  isDisabled = false,
  label,
  onClick,
  type = "button",
}: Properties): React.ReactElement => {
  return (
    <button
      className={styles["button"]}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export { Button };
