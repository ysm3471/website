import React from 'react';
import classes from './PostingDetail.module.css'

export default function PostingDetail() {
  return (
    <div className={classes.PostingDetail}>
      <div className={classes.category}>국내/K-POP</div>
      <div className={classes.title}>[라이브] 성시경 - 안녕 나의 사랑</div>
      <div className={classes.detail}>
        <div className={classes.writer}>글쓴이</div>
        <div className={classes.date}>06/21</div>
        <div className={classes.view}>조회수</div>
      </div>
    </div>
  )
}
