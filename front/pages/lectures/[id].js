import React from 'react';
import { useRouter } from 'next/router';

const Lecture = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>{id} 번 lecture의 페이지 입니다.</div>;
};

export default Lecture;
