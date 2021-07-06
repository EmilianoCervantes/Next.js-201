import { PropsWithChildren } from "react";

export const StepTitle = ({ children }: PropsWithChildren<{}>) => <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">{children}</p>