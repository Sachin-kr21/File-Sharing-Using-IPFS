import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enJSON from "./locale/en.json";
import hiJSON from "./locale/hi.json";
import zhJSON from "./locale/zh.json";
import frJSON from "./locale/fr.json";
import esJSON from "./locale/es.json";
import teJSON from "./locale/te.json";

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: "en",
        resources:{
            en : {...enJSON},
            hi : {...hiJSON},
            zh : {...zhJSON},
            fr : {...frJSON},
            es : {...esJSON},
            te : {...teJSON} 
        },fallbackLng : "en"
    })