import React from 'react';
import classes from './PostingDetail.module.css'

export default function PostingDetail({postingData}) {
  let title="국내/K-POP";

  switch(postingData.tag1) {
    case "pop":
      title = "팝";
      break;
    case "asia":
      title = "아시아"
      break;
  } 


  return (
    <div className={classes.PostingDetail}>
      <div className={classes.category}>{title}</div>
      <div className={classes.title}>[{postingData.tag2 === "music" ? "음원" : "라이브"}] {postingData.title}</div>
      <div className={classes.detail}>
        <div className={classes.writer}>{postingData.username}</div>
        <div className={classes.date}>06/21</div>
        <div className={classes.view}>조회수</div>
      </div>
    </div>
  )
}
