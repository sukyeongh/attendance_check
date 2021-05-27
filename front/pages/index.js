import Head from 'next/head';
import Router from 'next/router';
import styles from '../styles/Home.module.css';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {} from '@material-ui/icons';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>출결 시스템</title>
        <meta name='description' content='황수경의 IoT 프로젝트입니다.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>출결 시스템</h1>

        <Button
          variant='outlined'
          color='primary'
          style={{ width: `300px`, margin: `5px` }}
          onClick={() => Router.push('/login')}
        >
          로그인
        </Button>
        <Button variant='outlined' style={{ width: `300px`, margin: `5px` }} onClick={() => Router.push('/sign-up')}>
          회원가입
        </Button>
      </main>

      <footer className={styles.footer}>
        <div>2133603 황수경 기말프로젝트</div>
      </footer>
    </div>
  );
};

export default Home;
