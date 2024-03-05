import type { CSSProperties } from 'react'

import clsx from 'clsx'

type ImageSelectProps<T> = {
  className?: string
  errorMessage?: string
  getSrc: (value: T) => string
  images: T[]
  label?: string
  onChange?: (value: T) => void
  style?: CSSProperties
  value?: T
}

export const ImageSelect = <T extends unknown>({
  className,
  errorMessage,
  getSrc,
  images,
  label,
  onChange,
  style,
  value,
}: ImageSelectProps<T>) => {
  const showError = !!errorMessage && errorMessage?.length > 0

  return (
    <div className={clsx('flex flex-col gap-2', className)} style={style}>
      {label && <span className={'text-md'}>{label}</span>}

      <div className={'flex gap-2'}>
        {images.map((image, i) => (
          <button
            className={clsx(image === value && 'ring-2 ring-teal-600')}
            key={i}
            onClick={() => onChange?.(image)}
            type={'button'}
          >
            <img alt={`Default avatar №${image}`} className={'w-12 h-12'} src={getSrc(image)} />
          </button>
        ))}
      </div>

      {showError && <span className={'text-rose-400 text-sm'}>{errorMessage}</span>}
    </div>
  )
}
