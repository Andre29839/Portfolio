import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import getDictionary from "pages/[lang]/dictionaries";
import { Loader } from "components/Loader";

const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
  const router = useRouter();
  const [dict, setDict] = useState(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const newDict = await getDictionary(router.locale);
      setDict(newDict);
    };
    fetchDictionary();
  }, [router.locale]);

  if (dict === null) {
    return <Loader />;
  }

  return (
    <DictionaryContext.Provider value={dict}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  return useContext(DictionaryContext);
};
