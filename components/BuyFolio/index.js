import styles from './buyfolio.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Buyfolio = () => {
    const router = useRouter()
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/')
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            
            <div>
                <h1 className={styles.h1Loader}>Processing your Deal</h1>
                <h2 className={styles.h2Loader}>You can check your transaction in MetaMask</h2>
                
            </div>

            <div className={styles.container}>
                <div class={styles.loader}>
                    <div class={styles.bar}></div>
                </div>
            </div>
            <br/> 

        </div>
    )
}

export default Buyfolio
