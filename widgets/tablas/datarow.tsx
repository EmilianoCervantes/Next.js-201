import { PropsWithChildren } from "react";

export default function DatoRow({ children }: PropsWithChildren<{}>) {
  return <th className="border px-4 py-2">{children}</th>
}