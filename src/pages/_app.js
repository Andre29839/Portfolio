import "../css/main.min.css";

import Head from "next/head";
import { createContext } from "react";

export const AppContext = createContext({});

const App = ({ Component, pageProps }) => {
  return (
    <AppContext.Provider value={{}}>
      <Head>
        <link rel="canonical" />
      </Head>
      <main tabIndex={-1} id="MainContent">
        <Component {...pageProps} />
      </main>
    </AppContext.Provider>
  );
};

export default App;
