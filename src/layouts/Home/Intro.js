import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { tokens, useTheme } from "components/ThemeProvider";
import { Section } from "components/Section";
import { Transition } from "components/Transition";
import { DecoderText } from "components/DecoderText";
import { Heading } from "components/Heading";

import { useInterval, usePrevious, useScrollToHash } from "hooks";
import { cssProps } from "utils/style";

import ArrowDown from "assets/arrow-down.svg";

import styles from "./_Intro.module.scss";
import { useTranslation } from "react-i18next";

const DisplacementSphere = dynamic(() =>
  import("layouts/Home/DisplacementSphere").then(mod => mod.DisplacementSphere)
);

export function Intro({
  id,
  sectionRef,
  disciplines,
  scrollIndicatorHidden,
  ...rest
}) {
  const theme = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const scrollToHash = useScrollToHash();

  const prevTheme = usePrevious(theme);
  const currentDiscipline = disciplines.find(
    (_, index) => index === disciplineIndex
  );
  const titleId = `${id}-title`;

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme.themeId
  );

  useEffect(() => {
    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  const handleScrollClick = e => {
    e.preventDefault();
    scrollToHash(e.currentTarget.href);
  };

  const { t } = useTranslation();

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme.themeId} timeout={3000}>
        {(visible, status) => (
          <>
            <DisplacementSphere />
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                <DecoderText text={t("name")} delay={300} />
              </h1>
              <Heading level={0} as="h2" className={styles.title}>
                <span aria-hidden className={styles.row}>
                  <span
                    className={styles.word}
                    data-status={status}
                    style={cssProps({ delay: tokens.base.durationXS })}
                  >
                    {t("developer")}
                  </span>
                  <span className={styles.line} data-statu={status} />
                </span>
                <div className={styles.row} component="span">
                  <AnimatePresence>
                    {disciplines.map(item => (
                      <Transition
                        unmount
                        in={item === currentDiscipline}
                        timeout={{ enter: 3000, exit: 2000 }}
                        key={item}
                      >
                        {(_, status) => (
                          <span
                            aria-hidden
                            className={styles.word}
                            data-status={status}
                            style={cssProps({ delay: tokens.base.durationL })}
                          >
                            {item}
                          </span>
                        )}
                      </Transition>
                    ))}
                  </AnimatePresence>
                </div>
              </Heading>
            </header>
            <Link
              href="/#project-1"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            />
            <Link
              href="/#project-1"
              className={styles.mobileScrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <ArrowDown aria-hidden />
            </Link>
          </>
        )}
      </Transition>
    </Section>
  );
}
