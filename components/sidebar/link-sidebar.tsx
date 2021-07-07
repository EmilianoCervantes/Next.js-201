import Link from 'next/link'
import { useRouter } from 'next/router'

interface LinkSidebarProps {
  link: string
  title: string
}

export default function LinkSidebar({ link, title }: LinkSidebarProps) {
  const router = useRouter()
  
  const classPath = (path: string) => router.pathname === path ? 'bg-blue-800 p-2' : 'p-2'

  return (
    <li className={classPath(link)}>
      <Link href={link}>
        <a className="text-white block">{title}</a>
      </Link>
    </li>
  )
}