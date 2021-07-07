import Link from 'next/link'
import { PropsWithChildren } from "react";

interface ButtonChangeScreenProps {
  link: string
}

export const ButtonChangeScreen = ({ children, link }: PropsWithChildren<ButtonChangeScreenProps>) => {
  return (
    <div className="flex justify-center mt-5">
      <Link href={link}>
        <a className="inline-block text-sm text-center text-white">{children}</a>
      </Link>
    </div>
  )
}