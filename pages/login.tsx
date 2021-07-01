import { useFormik } from 'formik'
import * as yup from 'yup'
import { Input, Layout2, Submit } from "../components"

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      console.log('LOGIN SUBMIT');
      console.log(values);
    },
    validationSchema: {
      email: yup
        .string()
        .email('El email no es válido')
        .required('Falta el email'),
      password: yup
        .string()
        .required('Falta ingresar el password')
        .min(8, 'Debe contener al menos 8 caracteres'),
    }
  })

  return (
    <Layout2>
      <h1 className="text-center text-2xl text-white font-light">Login</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <Input
              error={formik.touched.email && formik.errors.email}
              name="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              error={formik.touched.password && formik.errors.password}
              name="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Submit lbl="Iniciar Sesión" />
          </form>
        </div>
      </div>
    </Layout2>
  )
}
