import Router from 'next/router';
import styles from '../../styles/Home.module.css';
import { Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {} from '@material-ui/icons';

const Login = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>로그인</h1>

        <div className={styles.flexCenter} style={{ marginBottom: `20px` }}>
          <TextField id='studentid' label='학번' variant='outlined' style={{ width: `300px`, margin: `5px` }} />
          <TextField id='pw' label='비밀번호' variant='outlined' style={{ width: `300px`, margin: `5px` }} />
        </div>

        <Button
          variant='outlined'
          color='primary'
          style={{ width: `300px`, margin: `5px` }}
          onClick={() => Router.push('/lectures')}
        >
          로그인
        </Button>
        <Button variant='outlined' style={{ width: `300px`, margin: `5px` }} onClick={() => Router.push('/')}>
          홈으로 돌아가기
        </Button>
      </main>
    </div>
  );
};

export default Login;
