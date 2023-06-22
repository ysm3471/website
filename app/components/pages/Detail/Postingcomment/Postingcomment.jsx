import React from 'react';
import classes from './Postingcomment.module.css'
import Comment from './Comment';
import CommentReg from './CommentReg';

export default function Postingcomment() {
  return (
    <div className={classes.Postingcomment}>
      <h2>댓글</h2>
      <div className={classes.commentWrap}>
        <Comment/>
        <CommentReg/>        
      </div>
    </div>
  )
}
