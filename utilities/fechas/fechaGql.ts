export const fechaGqlToHuman = (fecha: string) => {
  const d = new Date(Number(fecha)).toString()
  return d
}