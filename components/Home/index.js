import styles from "./home.module.css";
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <div className={styles.inrto_container}>
        <h1 className={styles.title}>Ready To Manage Your Portfolio?</h1>

        <h2 className={styles.subtitle}> Get Started In Minutes</h2>

        <div className={styles.MpageimageP1}>
          <img className={styles.p1_1} src="/computer-svgrepo-com.svg" alt="caccunt" />
          <hr />
          <img className={styles.p1_2} src="/trophies-svgrepo-com.svg" alt="cwallet" />
          <hr />
          <img className={styles.p1_3} src="/office-svgrepo-com.svg" alt="sselling" />
        </div>

        <div className={styles.MpageimagePp}>
          <span style={{ marginLeft: '0%', fontWeight: 'bold', color: 'black' }}>Connect to wallet</span>
          <span style={{ marginLeft: '21%', fontWeight: 'bold', color: 'black' }}>Choose Folio</span>
          <span style={{ marginLeft: '22%', fontWeight: 'bold', color: 'black' }}>Make a Million</span>
        </div>

        {/* <div className={styles.space1}>
          <p><br /><br /><br /><br /><br /><br />
          </p>
        </div> */}
      </div>
    </div>
  )
  // return <div className={styles.container}> Home </div>;
};

export default Home;
