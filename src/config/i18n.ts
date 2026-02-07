import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enLocale from '../locales/en.json'
import zhLocale from '../locales/zh.json'

const resources = {
  en: { translation: enLocale },
  zh: { translation: zhLocale },
}

const savedLanguage = localStorage.getItem('language') || 'zh'

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18next
