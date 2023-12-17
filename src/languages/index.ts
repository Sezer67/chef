import { I18n, TranslateOptions } from 'i18n-js';
import * as Localization from 'expo-localization'
import { AvaliableLocales, LanguageKeys } from './language.type';
import tr from './translations/tr.json';
import en from './translations/en.json';

const deviceLanguageCode = Localization.getLocales()[0].languageCode;
const i18n = new I18n();


const init = () => {
    i18n.availableLocales = ['tr', 'en'];
    i18n.enableFallback = true;
    if(i18n.availableLocales.includes(deviceLanguageCode)) {
        i18n.locale = deviceLanguageCode;
    } else {
        i18n.locale = 'tr';
    }
}

init();

i18n.translations = {
    tr,
    en
}

export const setAppLanguage = (lang: AvaliableLocales) => {
	i18n.locale = lang;
};

export const language = (
    key: LanguageKeys,
    options?: TranslateOptions | undefined,
): string => {
   return i18n.t(key, options); 
}

export default i18n;