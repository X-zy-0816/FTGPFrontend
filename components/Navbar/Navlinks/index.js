import Link from 'next/link'
import {useRouter} from 'next/router'

import styles from './navlinks.module.css'

const Navlinks = () => {
  const path = useRouter().pathname.toString()
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a className={path === '/' ? styles.highlight : undefined}>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/personal">
          <a className={path === '/Personal' ? styles.highlight : undefined}>Account</a>
        </Link>
      </li>
     
      <li>
        <Link href="/algorithm">
          <a className={path === '/algorithm' ? styles.highlight : undefined}>Folio</a>
        </Link>
      </li>


    </ul>
  )
}

export default Navlinks
