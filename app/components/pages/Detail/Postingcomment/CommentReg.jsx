import React from 'react';
import classes from './CommentReg.module.css'

export default function CommentReg() {
  return (
    <div className={classes.CommentReg}>
      <form>
        <textarea placeholder="로그인 해주세요"></textarea>
        <button>등록</button>
      </form>
    </div>
  )
}
