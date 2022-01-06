import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
// @ts-ignore
const Remote1 = dynamic(() => import('remote1/Remote1'), {
  ssr: false,
});

const Home: NextPage = () => {
  return <div className={styles.container}>{<Remote1 />}</div>;
};

export default Home;
