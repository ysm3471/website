"use client"

import React from 'react';
import classes from './Post.module.css';
import { useRouter } from 'next/navigation'

export default function Post({page,tag2,title,id,thumbnail}) {
  const router = useRouter();
  let thumbnailUrl;

  if(thumbnail) {
    thumbnailUrl = thumbnail.replace("https://youtu.be/","https://img.youtube.com/vi/");    // 유튜브 링크를 이용해 썸네일으로 변환
    thumbnailUrl += "/maxresdefault.jpg"
  }

  const onClick = (id) => {
    router.push(`${page}/${id}`);
  };
  return (
      <div className={classes.Post} onClick={() => onClick(id)}>
        <div className={classes.thumbnail}>
          {thumbnailUrl ? <img src={thumbnailUrl} alt={thumbnailUrl} /> : <img src="https://img.youtube.com/vi/ANRsBtI7A0U/maxresdefault.jpg" alt="썸네일이 없음" /> }
        </div>
        <div className={classes.content}>
          <div className={classes.title}>
            <div className={classes.category}>{tag2 === "music" ? '음원' : '라이브'}</div>
            <p>{title}</p>
          </div>
          <div className={classes.detail}>
            <div className={classes.writer}>글쓴이</div>
            <div className={classes.date}>06/21</div>
            <div className={classes.view}>조회수</div>
          </div>
        </div>
      </div>    
  )
}