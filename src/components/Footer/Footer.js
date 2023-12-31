import { LinkPersonal } from "components/LinkPersonal";
import { Text } from "components/Text";
import { useDictionary } from "components/DictionaryContext/DictionaryContext";

import { classes } from "utils/style";

import styles from "./_Footer.module.scss";

export const Footer = ({ className }) => {
  const dict = useDictionary();

  return (
    <footer className={classes(styles.footer, className)}>
      <Text size="s" align="center">
        <span className={styles.date}>© 2023 {dict?.name}</span>
        <LinkPersonal
          secondary
          className={styles.link}
          href="https://t.me/Andrii_Nepomniashchyi"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict?.contactMe}
        </LinkPersonal>
      </Text>
    </footer>
  );
};
