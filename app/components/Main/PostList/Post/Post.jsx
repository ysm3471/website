import React from 'react';
import classes from './Post.module.css';
import Link from 'next/link';

export default function Post({page}) {
  return (
    <Link href={`${page}/detail`}>
      <div className={classes.Post}>
        <div className={classes.thumbnail}>
          썸네일
        </div>
        <div className={classes.content}>
          <div className={classes.title}>
            <div className={classes.category}>국내</div>
            <p>성시경 - 잘 지내나요</p>
          </div>
          <div className={classes.detail}>
            <div className={classes.writer}>글쓴이</div>
            <div className={classes.date}>06/21</div>
            <div className={classes.view}>조회수</div>
          </div>
        </div>
      </div>    
    </Link>
  )
}
