import { useTranslation } from 'react-i18next'

import { Select } from '@/shared/ui'

type LangOption = {
  id: 'en' | 'ru'
  label: string
}

const langOptions: LangOption[] = [
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
]

export const LangSwitcher = () => {
  const { i18n } = useTranslation()

  const langOption = langOptions.find(option => option.id === i18n.language)

  const onChangeLanguage = (lang: LangOption) => i18n.changeLanguage(lang.id)

  return (
    <Select
      className={'min-w-20'}
      getLabel={option => option.label}
      onChange={onChangeLanguage}
      options={langOptions}
      value={langOption}
    />
  )
}
