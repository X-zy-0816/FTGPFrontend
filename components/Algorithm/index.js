import Link from 'next/link';
import styles from "./algorithm.module.css";

import MarkowitzTable from '../MarkowitzTable/index.js';

const Algorithm = () => {

  return (
    <div>
      <div>
        <MarkowitzTable />
      </div>
    </div>


  );
  // return <div className={styles.container}> Algorithm </div>;
};

export default Algorithm;
