interface InputParams {
  error?: string
  name: string
  value: string
  onChange: (any) => void
  onBlur?: (any) => void
}

export default function Input({ error, name, value, onChange, onBlur }: InputParams) {
  const nameLower = name.toLocaleLowerCase()
  let type = 'text'

  switch (nameLower) {
    case 'checkbox':
    case 'email':
    case 'file':
    case 'number':
    case 'password':
    case 'tel':
      type = nameLower;
      break;
    case 'correo':
    case 'mail':
      type = 'email';
    case 'teléfono':
    case 'telefono':
    case 'cel':
    case 'celular':
      type = 'tel';
      break;
    default:
      break;
  }

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={nameLower}>{name}</label>
        <input
          id={nameLower}
          className="shadow appearance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none docus:shadow-outline"
          type={type}
          placeholder={`${name} Usuario`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {error && (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
    </>
  )
}