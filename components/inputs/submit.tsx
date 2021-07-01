interface SubmitParams {
  lbl: string;
}

export default function Input({ lbl }: SubmitParams) {
  return (
    <input
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
      value={lbl}
    />
  )
}