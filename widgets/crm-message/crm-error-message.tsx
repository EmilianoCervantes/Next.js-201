import { PropsWithChildren } from "react";

export default function CrmErrorMessage({ children }: PropsWithChildren<{}>) {
  return (
    <div className="bg-red-700 py-2 px-3 w-full my-3 max-w-sm text-center text-white mx-auto rounded">
      <p>{children}</p>
    </div>
  )
}