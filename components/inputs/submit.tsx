interface SubmitParams {
  lbl: string
  disabled?: boolean
}

export default function Input({ lbl, disabled }: SubmitParams) {
  return (
    <input
      disabled={disabled}
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-700"
      value={lbl}
    />
  )
}