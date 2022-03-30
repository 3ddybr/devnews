import Image from 'next/image'
import { ActiveLink } from '../ActiveLink'
import styles from './styles.module.scss'

export function Header(){

  return(
    <header className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/logo.svg" alt="DevNews"
          width={150} height={150}
        />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a >Home</a>          
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a >Posts</a>
          </ActiveLink>
        </nav>
      </div>
    </header>
  )
}