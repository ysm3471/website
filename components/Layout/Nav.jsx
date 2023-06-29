"use client"

import React from 'react';
import classes from './Nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menu = [
  {id:'menu01',name:'전체게시판',path:'/all'},
  {id:'menu02',name:'국내',path:'/korea'},
  {id:'menu03',name:'팝송',path:'/pop'},
  {id:'menu04',name:'아시아',path:'/asia'}
]

export default function Nav() {
  const pathName = usePathname();

  const menus = menu.map((aa) => {    // 누르면 active 클라스를 추가하는 함수
    console.log(pathName)
    if(aa.path === pathName) {
      return <li key={aa.id} className={classes.active}><Link href={aa.path}>{aa.name}</Link></li>
    }
    else {
      return <li key={aa.id}><Link href={aa.path}>{aa.name}</Link></li>
    }
  })

  return (
    <div className={classes.Nav}>
      <ul>
        {menus}
      </ul>
    </div>
  )
}
