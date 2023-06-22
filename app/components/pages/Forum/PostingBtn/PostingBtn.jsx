import React from 'react';
import classes from './PostingBtn.module.css';
import Link from 'next/link';

export default function PostingBtn({page}) {
  return (
    <div className={classes.PostingBtn}><Link href={`${page}/new`}>글쓰기</Link></div>
  )
}
