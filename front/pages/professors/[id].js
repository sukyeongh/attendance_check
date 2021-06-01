import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import React, { useState } from 'react';
import axios from 'axios';

const Professor = ({ lecture, attendances }) => {
  const router = useRouter();

  const onLogout = () => {
    alert('로그아웃되었습니다.');
    Router.push('/');
  };

  const onResetAttendance = async () => {
    const data = (await axios.delete(`http://localhost:3001/api/attendances/reset/${lecture.lectureid}`)).data;

    if (data) {
      alert('초기화되었습니다.');
    } else {
      alert('초기화에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{lecture.title}</h1>

        <div>
          <div style={{ margin: `5px`, paddingLeft: '20px', fontWeight: 'bold' }}>총 {attendances.length}명 출석</div>
          <List style={{ width: `300px`, margin: `5px` }}>
            {attendances.map((item, index) => (
              <ListItem key={`${index}-${item.studentid}`}>
                <ListItemIcon>
                  <CheckIcon color='secondary' />
                </ListItemIcon>
                <ListItemText primary={`${item.studentname}(${item.studentid})`} />
              </ListItem>
            ))}
          </List>
        </div>

        <Button
          color='primary'
          variant='outlined'
          style={{ width: `300px`, margin: `5px` }}
          onClick={onResetAttendance}
        >
          초기화
        </Button>
        <Button variant='outlined' style={{ width: `300px`, margin: `5px` }} onClick={() => Router.push('/professors')}>
          강의목록 보기
        </Button>
        <Button color='secondary' variant='outlined' style={{ width: `300px`, margin: `5px` }} onClick={onLogout}>
          로그아웃
        </Button>
      </main>
    </div>
  );
};

Professor.getInitialProps = async ({ req, query: { id } }) => {
  const lecture = (await axios.get(`http://localhost:3001/api/lectures/${id}`)).data;

  const attendances = (await axios.get(`http://localhost:3001/api/attendances/${id}`)).data;

  return {
    lecture: lecture,
    attendances: attendances,
  };
};

export default Professor;
