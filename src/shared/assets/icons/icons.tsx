import type { SVGProps } from 'react'

import { withMemoizedForwardRef } from '@/shared/lib/HOC'

const svgWrapper = withMemoizedForwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>

export const Icons = {
  BadSmile: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={40}
      ref={ref}
      viewBox={'0 0 40 40'}
      width={40}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M20 38.5C9.8 38.5 1.5 30.2 1.5 20S9.8 1.5 20 1.5 38.5 9.8 38.5 20 30.2 38.5 20 38.5m0-36C10.35 2.5 2.5 10.35 2.5 20S10.35 37.5 20 37.5 37.5 29.65 37.5 20 29.65 2.5 20 2.5'
        }
      />
      <path
        d={
          'm11.48 29.01-.85-.52A10.97 10.97 0 0 1 20 23.25c3.83 0 7.33 1.94 9.36 5.18l-.85.53a10 10 0 0 0-8.5-4.7A9.98 9.98 0 0 0 11.48 29'
        }
      />
      <circle cx={14.67} cy={15.31} r={1} />
      <circle cx={25.33} cy={15.31} r={1} />
    </svg>
  )),
  ChevronUpDown: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={'1em'}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={'1em'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M18.207 9.043L12 2.836L5.793 9.043l1.414 1.414L12 5.664l4.793 4.793l1.414-1.414ZM5.793 14.957L12 21.165l6.207-6.208l-1.414-1.414L12 18.336l-4.793-4.793l-1.414 1.414Z'
        }
      ></path>
    </svg>
  )),
  CrossLight: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={16}
      ref={ref}
      viewBox={'0 0 16 16'}
      width={16}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M0.781396 16.0001C0.626858 16.0001 0.475783 15.9543 0.347281 15.8685C0.218778 15.7826 0.118621 15.6606 0.0594776 15.5178C0.00033466 15.3751 -0.0151369 15.218 0.0150198 15.0664C0.0451766 14.9148 0.119607 14.7756 0.228896 14.6664L14.6664 0.228853C14.8129 0.0823209 15.0117 0 15.2189 0C15.4261 0 15.6249 0.0823209 15.7714 0.228853C15.9179 0.375385 16.0002 0.574125 16.0002 0.781353C16.0002 0.988581 15.9179 1.18732 15.7714 1.33385L1.3339 15.7714C1.26141 15.844 1.17528 15.9016 1.08047 15.9408C0.985653 15.9801 0.884016 16.0002 0.781396 16.0001Z'
        }
      />
      <path
        d={
          'M15.2189 16.0001C15.1163 16.0002 15.0146 15.9801 14.9198 15.9408C14.825 15.9016 14.7389 15.844 14.6664 15.7714L0.228896 1.33385C0.0823639 1.18732 4.30364e-05 0.988581 4.30364e-05 0.781353C4.30364e-05 0.574125 0.0823639 0.375385 0.228896 0.228853C0.375428 0.0823209 0.574168 0 0.781396 0C0.988624 0 1.18736 0.0823209 1.3339 0.228853L15.7714 14.6664C15.8807 14.7756 15.9551 14.9148 15.9853 15.0664C16.0154 15.218 16 15.3751 15.9408 15.5178C15.8817 15.6606 15.7815 15.7826 15.653 15.8685C15.5245 15.9543 15.3734 16.0001 15.2189 16.0001Z'
        }
      />
    </svg>
  )),
  DotsSixVertical: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={'1em'}
      ref={ref}
      viewBox={'0 0 256 256'}
      width={'1em'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M104 60a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm60 12a12 12 0 1 0-12-12a12 12 0 0 0 12 12Zm-72 44a12 12 0 1 0 12 12a12 12 0 0 0-12-12Zm72 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12Zm-72 68a12 12 0 1 0 12 12a12 12 0 0 0-12-12Zm72 0a12 12 0 1 0 12 12a12 12 0 0 0-12-12Z'
        }
      ></path>
    </svg>
  )),
  Edit: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={'1em'}
      ref={ref}
      viewBox={'0 0 24 24'}
      width={'1em'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Zm-3.525-.725l-.7-.7l1.4 1.4l-.7-.7Z'
        }
      ></path>
    </svg>
  )),
  Moon: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={32}
      ref={ref}
      viewBox={'0 0 32 32'}
      width={32}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194 11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016 13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555 1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38 1.015 1.015 0 0 0 14.98 3'
        }
      />
    </svg>
  )),
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
  Sun: svgWrapper((props, ref) => (
    <svg
      fill={'currentColor'}
      height={32}
      ref={ref}
      viewBox={'0 0 32 32'}
      width={32}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M16 12a4 4 0 1 1-4 4 4 4 0 0 1 4-4m0-2a6 6 0 1 0 6 6 6 6 0 0 0-6-6M5.4 6.82 6.8 5.4l3.5 3.5-1.41 1.42zM2 15.01h5v2H2zM5.4 25.2l3.5-3.5 1.41 1.4-3.5 3.51zM15 25h2v5h-2zm6.69-1.9 1.41-1.4 3.5 3.5-1.4 1.41zM25 15h5v2h-5zm-3.31-6.1 3.5-3.5 1.42 1.41-3.5 3.5zM15 2h2v5h-2z'
        }
      />
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
