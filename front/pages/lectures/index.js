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
  title: {
    fontSize: 14,
  },
});

const lecture_list = [
  {
    id: 1,
    title: 'IoT서버',
    professor: '강준규',
    day: '화요일',
  },
  {
    id: 2,
    title: '파이썬 프로그래밍',
    professor: '문주영',
    day: '월요일',
  },
  {
    id: 3,
    title: '정보기술세미나',
    professor: '임웅택',
    day: '목요일',
  },
  {
    id: 4,
    title: 'VR컨텐츠',
    professor: '최윤석',
    day: '수요일',
  },
];

const Lectures = () => {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>강의 목록</h1>

        <div className={styles.card}>
          {lecture_list.map((item) => (
            <div key={item.id} style={{ margin: `5px` }}>
              <Link href={`/lectures/${item.id}`}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent style={{ width: '300px' }}>
                      <Typography className={classes.title} color='textSecondary' gutterBottom>
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

        <Button variant='outlined' style={{ width: `300px`, margin: `5px` }} onClick={() => Router.push('/')}>
          홈으로 돌아가기
        </Button>
      </main>

      <footer className={styles.footer}>
        <div>2133603 황수경 기말프로젝트</div>
      </footer>
    </div>
  );
};

export default Lectures;
