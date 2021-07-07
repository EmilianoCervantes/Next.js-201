import { PropsWithChildren } from "react";

interface ButtonProps {
  disabled?: boolean
  onClick: (e) => void
}

export default function Button({ children, disabled, onClick }: PropsWithChildren<ButtonProps>) {

  const btnClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 btnClass ${btnClass}`}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}