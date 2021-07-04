import { useFormik } from 'formik'
import * as yup from 'yup'
import { Input, Submit } from ".."
import ProductFormProps from "./productform-props"

export default function ProductoForm({ data, submitTitle, onSubmit }: ProductFormProps) {
  const formik = useFormik({
    initialValues: {
      nombre: data?.nombre ? data?.nombre : '',
      existencia: data?.existencia ? data?.existencia : '',
      precio: data?.precio ? data?.precio : '',
    },
    enableReinitialize: true,
    onSubmit: valores => {
      onSubmit(valores)
    },
    validationSchema: yup.object({
      nombre: yup
        .string()
        .required('El nombre es obligatorio'),
      existencia: yup
        .number()
        .integer('Debe ser un número entero, sin decimales')
        .positive('No puedes tener una existencia negativa')
        .min(1, 'Al menos se debe tener un elemento en existencia')
        .required('La existencia es obligatoria'),
      precio: yup
        .number()
        .positive('No puedes tener un precio negativo')
        .min(1, 'El costo debe tener un mínimo')
        .required('El precio es obligatorio'),
    })
  })

  return (
    <div className="flex justify-center mt-5">
      <div className="w-full max-w-lg">
        <form
          className="bg-white shadow-md px-8 py-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <Input
            error={formik.touched.nombre && formik.errors.nombre}
            name="Nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            paraQuien='Producto'
          />
          <Input
            error={formik.touched.existencia && formik.errors.existencia}
            name="Existencia"
            value={formik.values.existencia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            paraQuien='Producto'
          />
          <Input
            error={formik.touched.precio && formik.errors.precio}
            name="Precio"
            value={formik.values.precio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            paraQuien='Producto'
          />
          <Submit lbl={submitTitle} />
        </form>
      </div>
    </div>
  )
}