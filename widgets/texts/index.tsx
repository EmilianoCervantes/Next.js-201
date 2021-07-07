import { PropsWithChildren } from "react"

interface BoldTxtProps {
  top?: boolean
}

interface IconTxt {
  txt: string
}

export const BoldTxt = ({ children, top }: PropsWithChildren<BoldTxtProps>) => {
  const mt3 = top ? 'mt-3' : ''
  return (
    <p className={`font-bold text-gray-800 ${mt3}`}>{children}</p>
  )
}

export const IconTxt = ({ children, txt }: PropsWithChildren<IconTxt>) => {
  return (
    <p className="flex items-center my-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {children}
      </svg>
      {txt}
    </p>
  )
}