import { forwardRef, useId } from "react";

import styles from "./_Monogram.module.scss";

import Logo from "./logo.svg";

export const Monogram = forwardRef(({ ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;
  return (
    <div className={styles.logo}>
      <Logo id={clipId} ref={ref} {...props} />
    </div>
  );
});
