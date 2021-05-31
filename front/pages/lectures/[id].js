import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { Button } from '@material-ui/core';
import {} from '@material-ui/icons';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Lecture = ({ lecture }) => {
  useEffect(() => {
    getAttendanceData();
  }, []);

  const [cookies, setCookie, removeCookie] = useCookies(['userid']);
  const [attend, setAttend] = useState(false);

  const getAttendanceData = async () => {
    if (cookies.userid !== undefined) {
      const data = (
        await axios.get(`http://210.94.26.71:3001/api/attendances/attend/${lecture.lectureid}`, {
          params: {
            studentid: cookies.userid,
          },
        })
      ).data;
      console.log('isattend', data);
      setAttend(data);
    }
  };

  const onAttendLecture = async () => {
    if (cookies.userid !== undefined) {
      const data = (await axios.get(`http://210.94.26.71:3001/api/students/id/${cookies.userid}`)).data;

      if (data) {
        const params = new URLSearchParams();
        params.append('studentid', data.studentid);
        params.append('studentname', data.name);
        params.append('lectureid', lecture.lectureid);
        const res = await axios.post(`http://210.94.26.71:3001/api/attendances`, params);

        if (res.data) {
          alert('출석되었습니다.');
          setAttend(true);
        } else {
          alert('출석하지 못했습니다. 다시 시도해주세요');
        }
      }
    }
  };

  const onDeleteAttendance = async () => {
    const data = await axios.delete(`http://210.94.26.71:3001/api/attendances/${lecture.lectureid}`, {
      params: {
        studentid: cookies.userid,
      },
    });

    if (data) {
      alert('결석처리되었습니다..');
      setAttend(false);
    } else {
      alert('결석처리에 실패하였습니다.');
    }
  };

  const onLogout = () => {
    alert('로그아웃되었습니다.');
    removeCookie('userid');
    Router.push('/');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{lecture.title}</h1>

        <div className={styles.flexRowCenter} style={{ marginBottom: '30px' }}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            style={{ width: `140px`, margin: `5px` }}
            disabled={attend ? true : false}
            onClick={onAttendLecture}
          >
            출석
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            disabled={!attend ? true : false}
            onClick={onDeleteAttendance}
            style={{ width: `140px`, margin: `5px` }}
          >
            결석
          </Button>
        </div>

        <Button variant='outlined' style={{ width: `300px`, margin: `5px` }} onClick={() => Router.push('/lectures')}>
          강의목록 보기
        </Button>
        <Button color='secondary' variant='outlined' style={{ width: `300px`, margin: `5px` }} onClick={onLogout}>
          로그아웃
        </Button>
      </main>
    </div>
  );
};

Lecture.getInitialProps = async ({ req, query: { id } }) => {
  const res = await axios.get(`http://210.94.26.71:3001/api/lectures/${id}`);

  return {
    lecture: res.data,
  };
};

export default Lecture;
