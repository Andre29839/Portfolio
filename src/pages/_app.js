import Head from "next/head";
import { useRouter } from "next/router";
import { createContext, Suspense, useEffect, useReducer } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

import { ThemeProvider, tokens } from "components/ThemeProvider";
import { NavBar } from "components/NavBar";
import { Loader } from "components/Loader";

import { msToNum } from "utils/style";
import { useLocalStorage, useFoucFix } from "hooks";

import { initialState, reducer } from "helpers/reducer";
import { ScrollRestore } from "helpers/ScrollRestore";

import styles from "../layouts/App/_App.module.scss";
import "css/main.min.css";
import { DictionaryProvider } from "components/DictionaryContext/DictionaryContext";

export const AppContext = createContext({});

const App = ({ Component, pageProps }) => {
  const [storedTheme] = useLocalStorage("theme", "dark");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { route, asPath } = useRouter();
  const canonicalRoute = route === "/" ? "" : `${asPath}`;
  useFoucFix();

  useEffect(() => {
    dispatch({ type: "setTheme", value: storedTheme || "dark" });
  }, [storedTheme]);

  return (
    <DictionaryProvider>
      <AppContext.Provider value={{ ...state, dispatch }}>
        <ThemeProvider themeId={state.theme}>
          <LazyMotion features={domAnimation}>
            <Head>
              <link
                rel="canonical"
                href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${canonicalRoute}`}
              />
              <title>Andrii Nepomniashchyi</title>
            </Head>
            <NavBar />
            <main className={styles.app} tabIndex={-1} id="MainContent">
              <AnimatePresence mode="wait">
                <m.div
                  key={route}
                  className={styles.page}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    type: "tween",
                    ease: "linear",
                    duration: msToNum(tokens.base.durationS) / 1000,
                    delay: 0.1,
                  }}
                >
                  <ScrollRestore />
                  <Suspense fallback={<Loader />}>
                    <Component {...pageProps} />
                  </Suspense>
                </m.div>
              </AnimatePresence>
            </main>
          </LazyMotion>
        </ThemeProvider>
      </AppContext.Provider>
    </DictionaryProvider>
  );
};

export default App;
