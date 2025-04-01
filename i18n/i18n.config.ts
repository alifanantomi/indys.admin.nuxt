import en from '@/locales/en.json'
import id from '@/locales/id.json'
import { LANG } from '@/lib/types/i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: LANG.INDONESIA,
  messages: {
    en,
    id
  }
}))