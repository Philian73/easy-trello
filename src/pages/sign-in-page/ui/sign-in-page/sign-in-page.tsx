import { useTranslation } from 'react-i18next'

import { SignInForm } from '@/features/auth'

export const SignInPage = () => {
  const { t } = useTranslation()

  return (
    <div className={'grow flex flex-col pt-24'}>
      <div
        className={
          'rounded-xl border border-slate-300 px-14 py-8 pb-14 w-full max-w-[400px] bg-white self-center shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-700/30'
        }
      >
        <h1 className={'text-2xl mb-6'}>{t('pages.sign-in.title')}</h1>
        <SignInForm />
      </div>
    </div>
  )
}
