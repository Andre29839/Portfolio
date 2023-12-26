"use server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then(module => module.default),
  ua: () => import("./dictionaries/ua.json").then(module => module.default),
};

const getDictionary = async locale => {
  if (typeof dictionaries[locale] === "function") {
    return dictionaries[locale]();
  }
};

export default getDictionary;
