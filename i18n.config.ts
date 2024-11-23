import EN from './locales/en.json'
import TH from './locales/th.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'th',
  messages: {
    en: EN,
    th: TH,
  },
}))
