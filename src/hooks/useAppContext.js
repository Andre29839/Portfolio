import { useContext } from "react";

import { AppContext } from "pages/_app";

export function useAppContext() {
  return useContext(AppContext);
}
