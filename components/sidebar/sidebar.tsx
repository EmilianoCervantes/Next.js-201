import { HOME, MEJORES_CLIENTES, MEJORES_VENDEDORES, PEDIDOS, PRODUCTOS } from '../../navigation/crm-user-navigation'
import LinkSidebar from './link-sidebar'

export default function Sidebar() {

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM clientes</p>
      </div>

      <nav className="mt-5 list-none">
        <LinkSidebar link={HOME} title='Clientes' />
        <LinkSidebar link={PEDIDOS} title='Pedidos' />
        <LinkSidebar link={PRODUCTOS} title='Productos' />
      </nav>

      <div className="sm:mt-10">
        <p className="text-white text-2xl font-black">Otras Opciones</p>
      </div>
      <nav className="mt-5 list-none">
        <LinkSidebar link={MEJORES_CLIENTES} title='Mejores Clientes' />
        <LinkSidebar link={MEJORES_VENDEDORES} title='Mejores Vendedores' />
      </nav>
    </aside>
  )
}
