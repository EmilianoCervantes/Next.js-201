import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as yup from 'yup'
import { Input, Layout2, Submit } from "../components"
import { Mutation } from '../gql-tags/generated-types/crm-types'
import { SIGNUP_MUTATION } from '../gql-tags/usuarios'
import { LOGIN } from '../navigation/crm-auth-navigation'
import { ButtonChangeScreen, CrmGenericMessage } from '../widgets'

export default function NuevaCuenta() {
  const [mensaje, setMensaje] = useState('')

  // Mutations siempre usan array destructuring
  // Cualquiera que sea el nombre de tu mutation, es lo que regresará la func useMutation()
  const [crearUsuario] = useMutation<Mutation>(SIGNUP_MUTATION)

  const router = useRouter()

  // Validar formulario
  // Cada uno de los campos en el form
  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
    },
    onSubmit: async valores => {
      // Opcion1 desestructurar, pero como tienen los mismos nombres, abajo yo pasé directo valores
      // const { nombre, apellido, email, password } = valores;
      try {
        // ApolloClient también tiene su propio estado
        // Los resultados del query no se colocan en el state
        const { data } = await crearUsuario({
          variables: {
            // Recordar que en GQL está estipulado que se recibe un input de tipo UsuarioInput, no los parámetros directos

            // Pasé directo la var valores
            input: valores
          }
        })

        setMensaje(`Se creó correctamente al usuario: ${data.crearUsuario.nombre}`)

        setTimeout(() => {
          setMensaje('')
          router.push(LOGIN)
        }, 2500)

      } catch (error) {
        setMensaje(error.message)
      }
    },
    validationSchema: yup.object({
      nombre: yup
        .string()
        .required('El nombre es obligatorio'),
      apellido: yup
        .string()
        .required('El apellido es obligatorio'),
      email: yup
        .string()
        .email('El email no es válido')
        .required('El email es obligatorio'),
      password: yup
        .string()
        .required('El password es obligatorio')
        .min(8, 'Debe contener al menos 8 caracteres'),
    })
  })

  return (
    <Layout2>
      {!!mensaje && <CrmGenericMessage message={mensaje} />}
      <h1 className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={e => formik.handleSubmit(e)}
          >
            <Input
              error={formik.touched.nombre && formik.errors.nombre}
              name="Nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              error={formik.touched.apellido && formik.errors.apellido}
              name="Apellido"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
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
            <Submit lbl="Crear Cuenta" />
          </form>

          <ButtonChangeScreen link={LOGIN}>
          ¿Ya te registraste? Inicia sesión
          </ButtonChangeScreen>
        </div>
      </div>
    </Layout2>
  )
}
