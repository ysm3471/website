import React from 'react';
import classes from './Notice.module.css'
import { useRouter } from 'next/navigation';

export default function Notice() {
  const router = useRouter();

  function movePage() {
    router.push('/notice')
  }
  return (
    <div className={classes.Notice} onClick={movePage}>
      <div>
        공지
      </div>
      <p>[공지]게시물 작성 요령</p>
    </div>
  )
}
