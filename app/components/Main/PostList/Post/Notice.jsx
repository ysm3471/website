import React from 'react';
import classes from './Notice.module.css'

export default function Notice() {
  return (
    <div className={classes.Notice}>
      <div>
        공지
      </div>
      <p>[공지]게시물 작성 요령</p>
    </div>
  )
}
