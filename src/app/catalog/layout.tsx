import styles from './page.module.scss'


export default function CatalogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className={styles.catalogLayout}>{children}</div>
    )
  }