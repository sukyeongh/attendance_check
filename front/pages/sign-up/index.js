import Router from 'next/router';
import styles from '../../styles/Home.module.css';
import { Button, TextField } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {} from '@material-ui/icons';

import axios from 'axios';
import React from 'react';

const SignUp = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>회원가입</h1>

        <div className={styles.flexCenter} style={{ marginBottom: `20px` }}>
          <TextField id='studentid' label='학번' variant='outlined' style={{ width: `300px`, margin: `5px` }} />
          <TextField id='pw' label='비밀번호' variant='outlined' style={{ width: `300px`, margin: `5px` }} />{' '}
          <TextField id='name' label='이름' variant='outlined' style={{ width: `300px`, margin: `5px` }} />
        </div>

        <Button variant='outlined' color='primary' style={{ width: `300px`, margin: `5px` }}>
          가입하기
        </Button>
        <Button
          color='secondary'
          variant='outlined'
          style={{ width: `300px`, margin: `5px` }}
          onClick={() => Router.push('/login')}
        >
          로그인하러 가기
        </Button>
      </main>
    </div>
  );
};

// SignUp.getInitialProps = async () => {
//   const res = await axios.post('http://localhost:3001/students', {

//   })

//   return {
//     user: res.data,
//   };
// };

export default SignUp;
