import Head from "next/head";
import { useRouter } from "next/router";
import { createContext, useEffect, useReducer } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

import { msToNum } from "utils/style";
import { useLocalStorage } from "hooks/useLocalStorage";
import { initialState, reducer } from "helpers/reducer";

import { ThemeProvider } from "components/ThemeProvider";
import { tokens } from "components/ThemeProvider/theme";

import NavBar from "components/NavBar/NavBar";
import ScrollRestore from "helpers/ScrollRestore";

import styles from "layouts/App/_App.scss";
import "css/main.min.css";

export const AppContext = createContext({});

const App = ({ Component, pageProps }) => {
  const [storedTheme] = useLocalStorage("theme", "dark");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { route, asPath } = useRouter();
  const canonicalRoute = route === "/" ? "" : `${asPath}`;

  useEffect(() => {
    dispatch({ type: "setTheme", value: storedTheme || "dark" });
  }, [storedTheme]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider themeId={state.theme}>
        <LazyMotion features={domAnimation}>
          <Head>
            <link
              rel="canonical"
              href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${canonicalRoute}`}
            />
          </Head>
          <NavBar />
          <main tabIndex={-1} id="MainContent">
            <AnimatePresence exitBeforeEnter>
              <m.div
                key={route}
                className={styles.page}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "tween",
                  ease: "linear",
                  duration: msToNum(tokens.base.duration) / 1000,
                  delay: 0.1,
                }}
              >
                <ScrollRestore />
                <Component {...pageProps} />
              </m.div>
            </AnimatePresence>
          </main>
        </LazyMotion>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
