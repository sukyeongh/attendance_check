import Router from 'next/router';
import styles from '../../styles/Home.module.css';
import { Button, TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {} from '@material-ui/icons';

import axios from 'axios';
import React, { useState } from 'react';

const SignUp = () => {
  const [isStudent, setIsStudent] = useState(true);
  const [user, setUser] = useState({
    id: '',
    pw: '',
    name: '',
  });

  const [professor, setProfessor] = useState({
    id: '',
    pw: '',
    name: '',
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

  const onAddStudents = async () => {
    const params = new URLSearchParams();
    params.append('studentid', user.id);
    params.append('pw', user.pw);
    params.append('name', user.name);
    const res = await axios.post(`http://localhost:3001/api/students`, params);

    if (res.data) {
      alert('회원가입되었습니다.');
      setUser({
        id: '',
        pw: '',
        name: '',
      });
    } else {
      alert('회원가입에 실패하였습니다.');
    }
  };

  const onAddProfessors = async () => {
    const params = new URLSearchParams();
    params.append('professorid', user.id);
    params.append('pw', user.pw);
    params.append('name', user.name);
    const res = await axios.post(`http://localhost:3001/api/professors`, params);

    if (res.data) {
      alert('회원가입되었습니다.');
      setProfessor({
        id: '',
        pw: '',
        name: '',
      });
    } else {
      alert('회원가입에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>회원가입</h1>

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
            value={isStudent ? user.id : professor.id}
            onChange={isStudent ? onChangeUser : onChangeProfessor}
          />
          <TextField
            id='pw'
            label='비밀번호'
            type='password'
            variant='outlined'
            style={{ width: `300px`, margin: `5px` }}
            value={isStudent ? user.pw : professor.pw}
            onChange={isStudent ? onChangeUser : onChangeProfessor}
          />
          <TextField
            id='name'
            label='이름'
            variant='outlined'
            style={{ width: `300px`, margin: `5px` }}
            value={isStudent ? user.name : professor.name}
            onChange={isStudent ? onChangeUser : onChangeProfessor}
          />
        </div>

        <Button
          variant='outlined'
          color='primary'
          style={{ width: `300px`, margin: `5px` }}
          onClick={isStudent ? onAddStudents : onAddProfessors}
        >
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

export default SignUp;
