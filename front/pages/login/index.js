import Router from 'next/router';
import styles from '../../styles/Home.module.css';
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userid']);
  const [isStudent, setIsStudent] = useState(true);
  const [user, setUser] = useState({
    id: '',
    pw: '',
  });

  const [professor, setProfessor] = useState({
    id: '',
    pw: '',
  });

  const onChangeUser = (e) => {
    const { value, id } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const onChangeProfessor = (e) => {
    const { value, id } = e.target;
    setProfessor({
      ...professor,
      [id]: value,
    });
  };

  const onLogin = async () => {
    if (isStudent) {
      const res = await axios.get(`http://210.94.26.71:3001/api/students/${user.id}`, {
        params: {
          pw: user.pw,
        },
      });

      if (res.data.err) {
        alert('로그인에 실패하였습니다.');
      } else {
        alert('로그인되었습니다.');
        setCookie('userid', user.id, { maxAge: 2000 });
        Router.push('/lectures');
      }
    } else {
      const res = await axios.get(`http://210.94.26.71:3001/api/professors/${professor.id}`, {
        params: {
          pw: professor.pw,
        },
      });

      if (res.data.err) {
        alert('로그인에 실패하였습니다.');
      } else {
        alert('로그인되었습니다.');
        Router.push('/professors');
      }
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>로그인</h1>

        <RadioGroup row aria-label='position' name='position' defaultValue='top'>
          <FormControlLabel
            value='end'
            control={<Radio color='primary' checked={isStudent} />}
            label='학생'
            labelPlacement='start'
            onClick={() => setIsStudent(true)}
          />
          <FormControlLabel
            value='end'
            control={<Radio color='primary' checked={!isStudent} />}
            label='교수'
            labelPlacement='start'
            onClick={() => setIsStudent(false)}
          />
        </RadioGroup>
        <div className={styles.flexCenter} style={{ marginBottom: `20px` }}>
          <TextField
            id='id'
            label={isStudent ? '학번' : '아이디'}
            variant='outlined'
            style={{ width: `300px`, margin: `5px` }}
            value={isStudent ? user.id || '' : professor.id || ''}
            onChange={isStudent ? onChangeUser : onChangeProfessor}
          />
          <TextField
            id='pw'
            label='비밀번호'
            variant='outlined'
            type='password'
            style={{ width: `300px`, margin: `5px` }}
            value={isStudent ? user.pw || '' : professor.pw || ''}
            onChange={isStudent ? onChangeUser : onChangeProfessor}
          />
        </div>

        <Button variant='outlined' color='primary' style={{ width: `300px`, margin: `5px` }} onClick={onLogin}>
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
