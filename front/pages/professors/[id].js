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
