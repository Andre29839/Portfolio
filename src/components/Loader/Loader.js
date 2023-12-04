import { useReducedMotion } from "framer-motion";

import { Text } from "components/Text";
import { classes, cssProps } from "utils/style";

import styles from "./_Loader.module.scss";

export const Loader = ({
  className,
  style,
  size = 32,
  text = "Loading...",
  ...rest
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Text
        className={classes(styles.text, className)}
        weight="medium"
        {...rest}
      >
        {text}
      </Text>
    );
  }

  const gapSize = Math.round((size / 3) * 0.2);
  const spanSize = Math.round(size / 3 - gapSize * 2 - 1);

  return (
    <div
      className={classes(styles.text, className)}
      style={cssProps({ size, spanSize, gapSize }, style)}
      {...rest}
    >
      <div className={styles.contant}>
        <div className={styles.span} />
        <div className={styles.span} />
        <div className={styles.span} />
      </div>
    </div>
  );
};
