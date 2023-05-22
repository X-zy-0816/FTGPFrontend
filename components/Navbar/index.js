import styles from './navbar.module.css'
import Navlinks from './Navlinks/index'
import Link from 'next/link'
import MetaMask from '../MetaMask/MetaMask'

const Navbar = () => {
  return (
    <nav className={styles.mainnavbar}>

      <Link href='/'>
        <a>
          <img src="/globe-1-svgrepo-com.svg" width="50px" height="50px" />
        </a>
      </Link>
      
      <MetaMask />
      <Navlinks />
    </nav>

  )
}

export default Navbar
