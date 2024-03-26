import EN from '../public/locales/en/translation.json'
import RU from '../public/locales/ru/translation.json'

declare module 'i18next' {
   interface CustomTypeOptions {
      defaultNS: 'en'
      resources: {
         en: typeof EN,
         ru: typeof RU
      }
   }
}