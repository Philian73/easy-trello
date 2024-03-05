import type { SVGProps } from 'react'

import { withMemoizedForwardRef } from '@/shared/lib/HOC'

const svgWrapper = withMemoizedForwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>

export const Icons = {
  Spinner: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={32}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={32}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={'M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z'}
        opacity={0.25}
      />
      <path
        d={
          'M12 4a8 8 0 0 1 7.89 6.7 1.53 1.53 0 0 0 1.49 1.3 1.5 1.5 0 0 0 1.48-1.75 11 11 0 0 0-21.72 0A1.5 1.5 0 0 0 2.62 12a1.53 1.53 0 0 0 1.49-1.3A8 8 0 0 1 12 4Z'
        }
      >
        <animateTransform
          attributeName={'transform'}
          dur={'0.75s'}
          repeatCount={'indefinite'}
          type={'rotate'}
          values={'0 12 12;360 12 12'}
        />
      </path>
    </svg>
  )),
  TrashOutlined: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={24}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={24}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z'
        }
      ></path>
    </svg>
  )),
}

// ==============================================================================

if (import.meta.env.DEV) {
  for (const iconsKey in Icons) {
    Icons[iconsKey as keyof typeof Icons].displayName = `Icons.${iconsKey}`
  }
}

// ==============================================================================
