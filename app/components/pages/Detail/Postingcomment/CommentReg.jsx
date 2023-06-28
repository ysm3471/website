"use client"
import React from 'react';
import classes from './CommentReg.module.css'

export default function CommentReg() {
  function submitHandler(e) {
    e.preventDefault();
    alert('준비중인 기능입니다')
  }
  
  return (
    <div className={classes.CommentReg}>
      <form onSubmit={submitHandler}>
        <textarea placeholder="로그인 해주세요"></textarea>
        <button type='submit'>등록</button>
      </form>
    </div>
  )
}
