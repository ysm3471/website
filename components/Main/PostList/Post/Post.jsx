"use client"

import React from 'react';
import classes from './Post.module.css';
import { useRouter } from 'next/navigation';
import updateViewCnt from './updateViewCnt';

export default function Post({id,page,postingContent}) {
  const {tag2,title,thumbnail,time,username,viewcnt} = postingContent
  const router = useRouter();
  const today = new Date();   
  const now = today.getTime();    // 현재 시간을 밀리세컨드 단위로 바꿈
  const timestamp = (now-time)/1000;    // 게시물을 현재 시간 기준으로 몇 초 지났는지 저장하는 변수
  let when;   // 작성 날짜를 표기하는 변수
  let thumbnailUrl;   // 유튜브 주소를 썸네일로 변환시켜주는 변수

  switch(true) {
    case (timestamp<60) :   // 게시물이 1분 이전에 작성된 게시물일 경우 1분전으로 표시
      when = '1분전';
      break;
    case (timestamp<3600) : // 게시물이 1시간 이전에 작성된 게시물일 경우 몇 분 전인지 표시
      when = Math.floor(timestamp/60) + '분전'
      break;
    case (timestamp<86400) :  // 게시물이 하루 전에 작성된 게시물일 경우 몇 시간 전인지 표시
      when = Math.floor(timestamp/3600) + '시간전'
      break;
    default:    // 하루가 지난 게시물일 경우 작성 날짜로 표기
      const date = new Date(time);
      const month = date.getMonth() + 1;
      const day = date.getDate();

      when = month + "/" + day;
  }

  if(thumbnail) {
    thumbnailUrl = thumbnail.replace("https://youtu.be/","https://img.youtube.com/vi/");    // 유튜브 링크를 이용해 썸네일으로 변환
    thumbnailUrl += "/maxresdefault.jpg"
  }

  const onClick = (id) => {   // post를 클릭하면 해당 키 값을 가진 페이지로 이동함
    updateViewCnt(id);    // 누를때마다 db의 조회수를 1씩 증가시킴
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
            <div className={classes.writer}>{username}</div>
            <div className={classes.date}>{when}</div>
            <div className={classes.view}>조회수 {viewcnt}</div>
          </div>
        </div>
      </div>    
  )
}