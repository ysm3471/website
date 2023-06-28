import React from 'react';
import classes from './Comment.module.css'

export default function Comment() {
  return (
    <div className={classes.Comment}>
      <p className={classes.writer}>글쓴이<span>시간</span></p>
      <p className={classes.content}>댓글 내용</p>
    </div>
  )
}
