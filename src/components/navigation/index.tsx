'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import styles from './styles.module.scss'
 
export default function Navigation({ link }: {link: {href: string, name: string}}) {
  const pathname = usePathname()
  let isActive = pathname.endsWith(link.href)
 
  return (
    <Link href={link.href} className={[styles.link, isActive && styles.active].join(' ')}>{link.name}</Link>
  )
}