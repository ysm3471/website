import React from 'react';
import classes from './PostingDetail.module.css'

export default function PostingDetail({postingData,removePosting}) {
  let title="국내/K-POP";
  let tag = "음원";

  switch(postingData.tag1) {    // 태그에 맞춰서 변경
    case "pop":
      title = "팝";
      break;
    case "asia":
      title = "아시아"
      break;
    case "notice":
      title = "공지"
  } 

  switch(postingData.tag2) {    // 태그에 맞춰서 변경
    case "music":
      tag = "음원";
      break;
    case "live":
      tag = "라이브"
      break;
    case "notice":
      tag = "공지"
  } 

  return (
    <div className={classes.PostingDetail}>
      <div className={classes.category}>{title}</div>
      <div className={classes.title}>[{tag}] {postingData.title}</div>
      <div className={classes.detail}>
        <div className={classes.writer}>{postingData.username}</div>
        <div className={classes.date}>06/21</div>
        <div className={classes.view}>조회수 {postingData.viewcnt}</div>
      </div>
      <div className={classes.delete} onClick={removePosting}>
        <p>게시물 삭제</p>
      </div>
    </div>
  )
}
