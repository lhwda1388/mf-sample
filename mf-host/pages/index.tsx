import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import React from 'react';

const Remote1 = dynamic(
  () => {
    // @ts-ignore
    return import('remote1/Remote1');
  },
  {
    ssr: true,
    loading: ({ error }) => {
      if (error) {
        return <div>{error.message}</div>;
      }
      return <div>...loading</div>;
    },
  },
);
// @ts-ignore
const Remote11 = dynamic(
  () => {
    // @ts-ignore
    return import('remote1/Remote11');
  },
  {
    ssr: true,
    loading: ({ error }) => {
      if (error) {
        return <div>{error.message}</div>;
      }
      return <div>...loading</div>;
    },
  },
);

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Remote1 />
      <Remote11 />
      fef
    </div>
  );
};

export default Home;
