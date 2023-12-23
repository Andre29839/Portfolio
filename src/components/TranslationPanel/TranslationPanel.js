import { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import styles from "./_TranslationPanel.module.scss";

export const TranslationPanel = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState();

  useEffect(() => {
    setLang(i18next.language);
    i18next.on("languageChanged", lng => {
      setLang(lng);
    });
  }, []);

  const changeLanguage = language => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={() => {
          changeLanguage("en");
        }}
        disabled={lang === "en" || lang === "en-US"}
      >
        EN
      </button>
      <button
        className={styles.button}
        onClick={() => {
          changeLanguage("ua");
        }}
        disabled={lang === "ua"}
      >
        UA
      </button>
    </>
  );
};
