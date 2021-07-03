import { useMutation } from "@apollo/client"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useState } from "react"
import * as yup from 'yup'
import { Input, Layout, Submit } from "../components"
import { CREATE_CLIENTE_MUTATION, FETCH_CLIENTES_VENDEDOR_QUERY } from "../gql-tags/clientes"
import { Mutation } from "../gql-tags/generated-types/crm-types"
import { HOME } from "../navigation/crm-user-navigation"
import { fechaGqlToHuman } from "../utilities"
import { CrmGenericMessage, TitleHeader } from '../widgets'

// Apoyo validaciones yup: https://stackoverflow.com/questions/52483260/validate-phone-number-with-yup

export default function NuevoCliente() {
  const [mensaje, setMensaje] = useState('')

  const router = useRouter()

  /** Sintáxis para actualizar el caché, evitar hacer una consulta extra */
  const [nuevoCliente] = useMutation<Mutation>(CREATE_CLIENTE_MUTATION, {
    update(cache, { data: { nuevoCliente } }) {
      // Obtener el obj de caché que queremos actualizar
      const { obtenerClientesVendedor } = cache.readQuery({ query: FETCH_CLIENTES_VENDEDOR_QUERY })

      // Reescribir el caché (no modificar --> sí reescribir)
      cache.writeQuery({
        query: FETCH_CLIENTES_VENDEDOR_QUERY,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
        }
      })
    }
  })

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: '',
    },
    onSubmit: async valores => {
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: valores
          }
        })

        if (data.nuevoCliente) {
          const { fechaCreacion, nombre } = data.nuevoCliente
          setMensaje(`Se creó correctamente al cliente: ${nombre} el ${fechaGqlToHuman(fechaCreacion)}`)
        }

        setTimeout(() => {
          setMensaje('')
          router.push(HOME)
        }, 4000)

      } catch (error) {
        setMensaje(error.message)

        setTimeout(() => {
          setMensaje('')
        }, 2500)
      }
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
    <Layout>
      <TitleHeader>
        Nuevo Cliente
      </TitleHeader>

      {mensaje && <CrmGenericMessage message={mensaje} />}

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
              paraQuien='Cliente'
            />
            <Input
              error={formik.touched.apellido && formik.errors.apellido}
              name="Apellido"
              value={formik.values.apellido}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              paraQuien='Cliente'
            />
            <Input
              error={formik.touched.email && formik.errors.email}
              name="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              paraQuien='Cliente'
            />
            <Input
              error={formik.touched.empresa && formik.errors.empresa}
              name="Empresa"
              value={formik.values.empresa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              paraQuien='Cliente'
            />
            <Input
              error={formik.touched.telefono && formik.errors.telefono}
              name="Teléfono"
              value={formik.values.telefono}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              paraQuien='Cliente'
            />
            <Submit lbl="Crear Cliente" />
          </form>
        </div>
      </div>
    </Layout>
  )
}
