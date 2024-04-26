import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources, ns } from "./resources";
const systemLocale = navigator && navigator.language.substring(0,2)
let systemLocaleTag = systemLocale ?? "en";

const getSaveLocale = () => {
  const savedLocale = localStorage.getItem("locale");

  if (savedLocale !== null) {
    systemLocaleTag = JSON.parse(savedLocale);
    i18n.changeLanguage(systemLocaleTag);
  }
  return systemLocaleTag;
};
getSaveLocale();
i18n.use(initReactI18next).init({
  resources,
  ns,
  fallbackLng: "en",
  lng: systemLocaleTag,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
