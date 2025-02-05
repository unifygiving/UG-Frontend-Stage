import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "@os-team/i18next-react-native-language-detector";
//import Backend from 'i18next-http-backend';
import en from "./i18n/locales/en.json";
import de from "./i18n/locales/de.json";

const resources = { en, de };

i18n
    //.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        debug: true,
    });

export default i18n;