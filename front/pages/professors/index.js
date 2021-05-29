import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActionArea, Button } from '@material-ui/core';
import {} from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    width: '300px',
  },
});

const lecture_list = [
  {
    id: 1,
    title: 'IoT서버',
    day: '화요일',
  },
  {
    id: 5,
    title: '최신개발기술',
    day: '월요일',
  },
  {
    id: 6,
    title: '오픈소스소프트웨어',
    day: '수요일',
  },
  {
    id: 7,
    title: 'VC++',
    day: '목요일',
  },
];

const Professors = () => {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>강의 목록</h1>

        <div className={styles.card}>
          {lecture_list.map((item) => (
            <div key={item.id} style={{ margin: `5px` }}>
              <Link href={`/professors/${item.id}`}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent style={{ width: '300px' }}>
                      <Typography color='textSecondary' gutterBottom>
                        {item.day}
                      </Typography>
                      <Typography variant='h5' component='h2'>
                        {item.title}
                      </Typography>
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

export default Professors;
