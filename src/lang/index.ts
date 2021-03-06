import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import elementEsLocale from 'element-ui/lib/locale/lang/es'; // element-ui lang
import enLocale from './en';
import zhLocale from './zh';
import esLocale from './es';
import store from 'store';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  es: {
    ...esLocale,
    ...elementEsLocale
  }
};

export function getLanguage() {
  const chooseLanguage = store.get('language');
  if (chooseLanguage) return chooseLanguage;
  const navigatorNew = window.navigator as any;

  // if has not choose language
  const language = (navigatorNew.language || navigatorNew.browserLanguage).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'en';
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
});

export default i18n;
