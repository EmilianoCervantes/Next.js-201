import { PropsWithChildren } from "react"
import ButtonIconProps from "./button-icon-props"

export const ButtonIcon = ({ children, color, click, title, extraClasses }: PropsWithChildren<ButtonIconProps>) => {

  const extra = extraClasses ? extraClasses : ''

  return (
    <button
      type='button'
      className={`flex justify-center items-center py-2 px-4 w-full text-white rounded text-xs uppercase font-bold ${color} ${extra}`}
      onClick={click}
    >
      <p>{title}</p>
      {/* Obtenido de https://heroicons.com/ */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {children}
      </svg>
    </button>
  )
}