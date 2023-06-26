"use client"
import React, { useEffect } from 'react';
import classes from './Pagination.module.css';
import { useRouter } from 'next/navigation';

export default function Pagination({page,searchParams,pagelen}) {
  const router = useRouter();

  console.log(searchParams);
  function pageMove(moveNum) {
    router.push(`/${page}/?page=${moveNum+1}`)
  }
  return (
    <div className={classes.Pagination}>
      <button onClick={()=>pageMove(0)}>1</button>
      <button onClick={()=>pageMove(1)}>2</button>
    </div>
  )
}
