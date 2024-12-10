import ClientComponent from './client-component'
import styles from './page.module.css'
import ServerComponent from './server-component'

export default function Home() {
  return (
    <div className={styles.page}>
      Index page
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  )
}
