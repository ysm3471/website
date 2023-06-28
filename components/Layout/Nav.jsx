import React from 'react';
import classes from './Nav.module.css';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className={classes.Nav}>
      <ul>
        <li><Link href="/all">전체게시판</Link></li>
        <li><Link href="/korea">국내</Link></li>
        <li><Link href="/pop">팝송</Link></li>
        <li><Link href="/asia">아시아</Link></li>
      </ul>
    </div>
  )
}
