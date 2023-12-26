import { useRouter } from "next/router";

import styles from "./_TranslationPanel.module.scss";
import { useDictionary } from "components/DictionaryContext/DictionaryContext";

export const TranslationPanel = () => {
  const router = useRouter();
  const dict = useDictionary();

  const changeLanguage = language => {
    router.push(router.asPath, undefined, { locale: language, scroll: false });
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={() => {
          changeLanguage("en");
        }}
        disabled={router.locale === "en"}
      >
        {dict?.en}
      </button>
      <button
        className={styles.button}
        onClick={() => {
          changeLanguage("ua");
        }}
        disabled={router.locale === "ua"}
      >
        {dict?.ua}
      </button>
    </>
  );
};
