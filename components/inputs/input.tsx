interface InputParams {
  error?: string
  name: string
  paraQuien?: string
  value: string | number
  onChange: (any) => void
  onBlur?: (any) => void
}

export default function Input({ error, name, paraQuien, value, onChange, onBlur }: InputParams) {
  /** SOL de: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript */
  const nameClean = name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  let type = 'text'

  switch (nameClean) {
    case 'checkbox':
    case 'email':
    case 'file':
    case 'number':
    case 'password':
    case 'tel':
      type = nameClean;
      break
    case 'correo':
    case 'mail':
      type = 'email';
    case 'telefono':
    case 'cel':
    case 'celular':
      type = 'tel';
      break
    case 'existencia':
    case 'precio':
      type = 'number'
      break
    default:
      break
  }

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={nameClean}>{name}</label>
        <input
          id={nameClean}
          className="shadow appearance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none docus:shadow-outline"
          type={type}
          placeholder={`${name} ${paraQuien ? paraQuien : 'Usuario'}`}
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