import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import React from 'react';

const Header = dynamic(
  () => {
    // @ts-ignore
    return import('header/Header');
  },
  {
    ssr: false,
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
      <Header />
    </div>
  );
};

export default Home;
