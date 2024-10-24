import type { SVGProps } from 'react'

export function HandTap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 256 256'
      {...props}
    >
      <path
        fill='currentColor'
        d='M64 64a48 48 0 0 1 96 0a8 8 0 0 1-16 0a32 32 0 0 0-64 0a8 8 0 0 1-16 0m143.23 56c-8.61.4-15.23 7.82-15.23 16.43v7.28a8.17 8.17 0 0 1-7.47 8.25a8 8 0 0 1-8.53-8v-23.51c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 144 120v15.73a8.17 8.17 0 0 1-7.47 8.25a8 8 0 0 1-8.53-8V64.45c0-8.61-6.62-16-15.23-16.43A16 16 0 0 0 96 64v119.74a8.19 8.19 0 0 1-6.72 8.16h-.12a6.09 6.09 0 0 1-6-3.09l-21-36.44c-4.3-7.46-13.74-10.57-21.4-6.62A16 16 0 0 0 34.15 168l30.95 60.05A8 8 0 0 0 72 232h136a8 8 0 0 0 7.16-4.42c.36-.72 8.84-15.06 8.84-40.65V136a16 16 0 0 0-16.77-16'
      ></path>
    </svg>
  )
}