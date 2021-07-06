import { PropsWithChildren } from "react";

export const TitleHeader = ({ children }: PropsWithChildren<{}>) => <h1 className="text-2xl text-gray-800 font-light">{children}</h1>