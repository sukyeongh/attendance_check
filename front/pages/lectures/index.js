import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActionArea, Button } from '@material-ui/core';
import {} from '@material-ui/icons';

import axios from 'axios';
import React, { useState } from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    width: '300px',
  },
});

const Lectures = ({ lectures }) => {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>수강 목록</h1>

        <div className={styles.card}>
          {lectures.map((item) => (
            <div key={item.lectureid} style={{ margin: `5px` }}>
              <Link href={`/lectures/${item.lectureid}`}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent style={{ width: '300px' }}>
                      <Typography color='textSecondary' gutterBottom>
                        {item.day}
                      </Typography>
                      <Typography variant='h5' component='h2'>
                        {item.title}
                      </Typography>
                      <Typography color='textSecondary'>{`${item.professor} 교수님`}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

Lectures.getInitialProps = async () => {
  const res = await axios.get(`http://localhost:3001/api/lectures/`);
  return {
    lectures: res.data,
  };
};

export default Lectures;
