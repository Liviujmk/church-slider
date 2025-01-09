import { cn } from '@/lib/utils'

interface IconProps {
  size?: number
  className?: string
}

export const SongKeyIcon = ({ size = 14, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M20.8899 5.17995V16.4799C20.8899 18.4599 19.2799 20.0699 17.2999 20.0699C15.3299 20.0699 13.7099 18.4599 13.7099 16.4799C13.7099 14.5099 15.3299 12.8999 17.2999 12.8999C18.1399 12.8999 18.8899 13.1899 19.4999 13.6699V7.71995L10.2899 10.3399V18.4099C10.2899 20.3899 8.66986 21.9999 6.69986 21.9999C4.71986 21.9999 3.10986 20.3899 3.10986 18.4099C3.10986 16.4399 4.71986 14.8299 6.69986 14.8299C7.52986 14.8299 8.27986 15.1199 8.88986 15.5899V6.74995C8.88986 5.27995 9.77986 4.13995 11.1899 3.75995L16.9699 2.17995C18.1399 1.85995 19.1299 1.96995 19.8299 2.50995C20.5399 3.03995 20.8899 3.93995 20.8899 5.17995Z"
        fill="#292D32"
      />
    </svg>
  )
}

export const BrandIcon = ({ size = 14, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M8.4651 3.42627H5.89534L0 13.1511L6.09689 23.3797H13.9573L17.1318 18.0386L8.4651 3.42627Z"
        fill="#181797"
      />
      <path
        d="M14.7636 3.32568L4.38379 20.5078L6.09696 23.3799H13.9574L26 3.32568H23.531L22.2713 5.59312L21.0117 3.32568H14.7636Z"
        fill="#0056A6"
        fillOpacity="0.57"
      />
      <path d="M22.221 2.92236L20.9555 0.730507L23.4865 0.730507L22.221 2.92236Z" fill="#6B9ECC" />
      <path d="M24.8411 2.41895L24.4483 1.73871L25.2338 1.73871L24.8411 2.41895Z" fill="#6B9ECC" />
      <path
        d="M17.1317 18.0388L11.5387 8.61637L14.7635 3.32568H21.0115L22.2712 5.59312L23.5309 3.32568H25.9999L17.1317 18.0388Z"
        fill="#6B9ECC"
      />
      <path d="M18.2907 6.4502L17.8107 5.6188L18.7707 5.6188L18.2907 6.4502Z" fill="white" />
      <path d="M19.8526 2.92236L19.329 2.01539L20.3763 2.01539L19.8526 2.92236Z" fill="#6B9ECC" />
    </svg>
  )
}

export const CloseIcon = ({ size = 11.3, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={cn(className)}
        d="M0.536987 1L10.537 11M10.537 1L0.536987 11"
        stroke="#747474"
        fill="currentColor"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const MinimizeIcon = ({ size = 11.3, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2.77778 0C2.50164 0 2.27778 0.223858 2.27778 0.5C2.27778 0.776142 2.50164 1 2.77778 1H9.03704C10.4177 1 11.537 2.11929 11.537 3.5V9.75926C11.537 10.0354 11.7609 10.2593 12.037 10.2593C12.3132 10.2593 12.537 10.0354 12.537 9.75926V3.5C12.537 1.567 10.97 0 9.03704 0H2.77778ZM2 2.42593H9.11111C9.6634 2.42593 10.1111 2.87364 10.1111 3.42593V10.537C10.1111 11.0893 9.6634 11.537 9.11111 11.537H2C1.44772 11.537 1 11.0893 1 10.537V3.42593C1 2.87364 1.44771 2.42593 2 2.42593ZM0 3.42593C0 2.32136 0.895431 1.42593 2 1.42593H9.11111C10.2157 1.42593 11.1111 2.32136 11.1111 3.42593V10.537C11.1111 11.6416 10.2157 12.537 9.11111 12.537H2C0.89543 12.537 0 11.6416 0 10.537V3.42593Z"
        fill="#747474"
      />
    </svg>
  )
}

export const MinusIcon = ({ size = 11.5, className }: IconProps) => {
  return (
    <svg
      width={size}
      height="1"
      viewBox="0 0 12 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <rect width="12" height="0.8" fill="#747474" />
    </svg>
  )
}

export const PresentationIcon = ({ size = 13, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.435616 0C0.195034 0 0 0.195034 0 0.435616C0 0.676197 0.195034 0.871231 0.435616 0.871231H1.59726V5.37259C1.59726 7.15228 1.59726 8.04216 2.18052 8.59504C2.76378 9.14793 3.70253 9.14793 5.58 9.14793H5.80821V11.202L4.88737 11.6624C4.67219 11.77 4.58496 12.0316 4.69255 12.2468C4.80015 12.462 5.06181 12.5493 5.27699 12.4416L6.24382 11.9582L7.21066 12.4416C7.42585 12.5493 7.68751 12.462 7.79508 12.2468C7.9027 12.0316 7.81546 11.77 7.60027 11.6624L6.67944 11.202V9.14793H6.90764C8.78509 9.14793 9.72387 9.14793 10.3071 8.59504C10.8904 8.04216 10.8904 7.15228 10.8904 5.37259V0.871231H12.052C12.2926 0.871231 12.4876 0.676197 12.4876 0.435616C12.4876 0.195034 12.2926 0 12.052 0H0.435616ZM8.29429 3.90292C8.46442 4.07304 8.46442 4.34886 8.29429 4.51898L7.52924 5.28407C7.44502 5.36835 7.35394 5.45948 7.26676 5.52604C7.16454 5.60399 7.01835 5.68792 6.82464 5.68792C6.63094 5.68792 6.48475 5.60399 6.38252 5.52604C6.29534 5.45948 6.20427 5.36835 6.12005 5.28407L5.76569 4.92968C5.72498 4.88899 5.69198 4.85602 5.663 4.82795C5.63402 4.85602 5.60103 4.88899 5.56031 4.92968L4.80939 5.6806C4.63927 5.85072 4.36345 5.85072 4.19333 5.6806C4.02322 5.51048 4.02322 5.2347 4.19333 5.06457L4.95841 4.29947C5.04263 4.2152 5.1337 4.12407 5.22088 4.05752C5.32311 3.97956 5.4693 3.89563 5.663 3.89563C5.85671 3.89563 6.0029 3.97956 6.10512 4.05752C6.1923 4.12407 6.28338 4.21518 6.36754 4.29944L6.72195 4.65386C6.76267 4.69455 6.79566 4.72753 6.82464 4.75559C6.85363 4.72753 6.88662 4.69455 6.92733 4.65386L7.67828 3.90292C7.8484 3.73281 8.12417 3.73281 8.29429 3.90292Z"
        fill="white"
        className={cn(className)}
      />
    </svg>
  )
}

export const SongNote1Icon = ({ size = 60, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M31.875 31.27L53.125 22.77V36.9022C51.8623 36.0937 50.3607 35.625 48.75 35.625C44.2628 35.625 40.625 39.2627 40.625 43.75C40.625 48.2372 44.2628 51.875 48.75 51.875C53.2373 51.875 56.875 48.2372 56.875 43.75V19.8656C56.875 17.0085 56.875 14.6124 56.674 12.7033C56.6455 12.4335 56.612 12.1652 56.575 11.9149C56.3812 10.6106 56.039 9.39392 55.3785 8.37787C55.0482 7.86985 54.6383 7.41202 54.1278 7.01847C54.032 6.9447 53.9325 6.87317 53.8298 6.804L53.809 6.7902C52.041 5.6135 50.0532 5.69765 48.0057 6.21942C46.0255 6.72402 43.5705 7.75162 40.56 9.01172L35.325 11.2029C33.9137 11.7934 32.7183 12.2938 31.78 12.812C30.7815 13.3634 29.9215 14.0137 29.2765 14.9828C28.6318 15.9519 28.3637 16.9962 28.2407 18.1301C28.125 19.1958 28.125 20.4918 28.125 22.0214V41.9022C26.862 41.0938 25.3608 40.625 23.75 40.625C19.2627 40.625 15.625 44.2627 15.625 48.75C15.625 53.2373 19.2627 56.875 23.75 56.875C28.2372 56.875 31.875 53.2373 31.875 48.75V31.27Z"
        fill="#9B9B9B"
      />
      <path
        opacity="0.5"
        d="M19.375 5C19.375 3.96448 18.5355 3.125 17.5 3.125C16.4645 3.125 15.625 3.96448 15.625 5V19.4023C14.3621 18.5938 12.8608 18.125 11.25 18.125C6.76268 18.125 3.125 21.7627 3.125 26.25C3.125 30.7372 6.76268 34.375 11.25 34.375C15.7373 34.375 19.375 30.7372 19.375 26.25V12.5112C21.1213 13.7728 23.1989 14.375 25 14.375C26.0355 14.375 26.875 13.5355 26.875 12.5C26.875 11.4645 26.0355 10.625 25 10.625C23.8641 10.625 22.4158 10.1847 21.279 9.24592C20.196 8.35152 19.375 6.99463 19.375 5Z"
        fill="#9B9B9B"
      />
    </svg>
  )
}

export const SongNote2Icon = ({ size = 60, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <path
        d="M35.7967 6.26244C32.6285 5.89289 29.6222 7.75082 28.536 10.7497C28.2913 11.4256 28.2052 12.1563 28.165 12.9222C28.1348 13.5 28.1273 14.1888 28.1258 15L28.125 16.1375C28.125 16.1495 28.125 16.1615 28.125 16.1734V36.3397C26.0007 34.346 23.143 33.125 20 33.125C13.4416 33.125 8.125 38.4415 8.125 45C8.125 51.5585 13.4416 56.875 20 56.875C26.5585 56.875 31.875 51.5585 31.875 45V23.0265C32.137 23.1661 32.4207 23.3079 32.7318 23.4632L39.5005 26.8475C40.5462 27.3702 41.3972 27.7957 42.0945 28.0997C42.7975 28.4062 43.4895 28.6562 44.2035 28.7395C47.3715 29.109 50.3778 27.251 51.464 24.2522C51.709 23.5764 51.7948 22.8456 51.8353 22.0797C51.875 21.3201 51.875 20.3688 51.875 19.1997L51.8752 18.9926C51.8755 18.1232 51.8758 17.4431 51.7525 16.7986C51.435 15.1396 50.5177 13.6556 49.176 12.6296C48.6545 12.231 48.0462 11.9272 47.2685 11.5387L40.4997 8.15447C39.454 7.63159 38.603 7.20609 37.9058 6.90214C37.2028 6.59564 36.5107 6.34572 35.7967 6.26244Z"
        fill="#9B9B9B"
      />
    </svg>
  )
}
