"use client"

import React from 'react';
import classes from './Post.module.css';
import { useRouter } from 'next/navigation'

export default function Post({page,tag2,title,id,thumbnail,time,userName}) {
  const router = useRouter();
  const today = new Date();
  const now = today.getTime();
  const timestamp = (now-time)/1000;
  let when;
  let thumbnailUrl;

  switch(true) {
    case (timestamp<60) :
      when = '1분전';
      break;
    case (timestamp<3600) :
      when = Math.floor(timestamp/60) + '분전'
      break;
    case (timestamp<86400) :
      when = Math.floor(timestamp/3600) + '시간전'
      break;
    default:
      const date = new Date(time);
      const month = date.getMonth() + 1;
      const day = date.getDay();

      when = month + "/" + day;
  }


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
            <div className={classes.writer}>{userName}</div>
            <div className={classes.date}>{when}</div>
            <div className={classes.view}>조회수</div>
          </div>
        </div>
      </div>    
  )
}