import { useFormik } from "formik"
import * as yup from 'yup'
import { Input, Submit } from ".."
import ClientFormProps from "./clientform-props"

export default function ClientForm({ data, paraQuien, submitTitle, onSubmit }: ClientFormProps) {

  const formik = useFormik({
    initialValues: {
      nombre: data?.nombre ? data?.nombre : '',
      apellido: data?.apellido ? data?.apellido : '',
      empresa: data?.empresa ? data?.empresa : '',
      email: data?.email ? data?.email : '',
      telefono: data?.telefono ? data?.telefono : '',
    },
    enableReinitialize: true,
    onSubmit: valores => {
      onSubmit(valores)
    },
    validationSchema: yup.object({
      nombre: yup
        .string()
        .required('El nombre es obligatorio'),
      apellido: yup
        .string()
        .required('El apellido es obligatorio'),
      empresa: yup
        .string()
        .required('La empresa es obligatoria'),
      email: yup
        .string()
        .email('El email no es válido')
        .required('El email es obligatorio'),
      telefono: yup
        .string()
        .min(10, 'Debe tener 10 dígitos')
        .max(10, 'Debe tener 10 dígitos')
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'No es un número de teléfono válido'),
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
            paraQuien={paraQuien}
          />
          <Input
            error={formik.touched.apellido && formik.errors.apellido}
            name="Apellido"
            value={formik.values.apellido}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            paraQuien={paraQuien}
          />
          <Input
            error={formik.touched.email && formik.errors.email}
            name="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            paraQuien={paraQuien}
          />
          <Input
            error={formik.touched.empresa && formik.errors.empresa}
            name="Empresa"
            value={formik.values.empresa}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            paraQuien={paraQuien}
          />
          <Input
            error={formik.touched.telefono && formik.errors.telefono}
            name="Teléfono"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            paraQuien={paraQuien}
          />
          <Submit lbl={submitTitle} />
        </form>
      </div>
    </div>
  )
}