import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as yup from 'yup'
import { Input, Layout2, Submit } from "../components"
import { Mutation } from '../gql-tags/generated-types/crm-types'
import { LOGIN_MUTATION } from '../gql-tags/usuarios'
import { HOME } from '../navigation/crm-user-navigation'
import { CrmGenericMessage } from '../widgets'

export default function Login() {
  const [mensaje, setMensaje] = useState('')

  const [autenticarUsuario] = useMutation<Mutation>(LOGIN_MUTATION)

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: 'o.cervantes@meetccs.com',
      password: '12345678',
    },
    onSubmit: async values => {
      try {
        const { data } = await autenticarUsuario({
          variables: {
            // Recordar que en GQL está estipulado que se recibe un input de tipo AutenticarInput, no los parámetros directos
            input: values
          }
        })

        setMensaje('Has iniciado sesión exitosamente')

        const { token } = data.autenticarUsuario
        localStorage.setItem('token', token)

        setTimeout(() => {
          setMensaje('')
          router.push(HOME)
        }, 2000)
      } catch (error) {
        setMensaje(error.message)
      }
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email('El email no es válido')
        .required('Falta el email'),
      password: yup
        .string()
        .required('Falta ingresar el password')
        .min(8, 'Debe contener al menos 8 caracteres'),
    })
  })

  return (
    <Layout2>
      {!!mensaje && <CrmGenericMessage message={mensaje} />}
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
