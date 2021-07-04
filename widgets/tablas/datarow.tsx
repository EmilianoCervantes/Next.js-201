import { PropsWithChildren } from "react";

export default function DatoRow({ children }: PropsWithChildren<any>) {
  return <th className="border px-4 py-2">{children}</th>
}