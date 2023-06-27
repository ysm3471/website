"use client"
import React, { useEffect, useRef, useState } from 'react';
import classes from './Pagination.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getLen from './GetLen';

export default function Pagination({ setOn,page }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const dbKey = useRef([]);
  const [on2, setOn2] = useState(false);
  const [pageLists, setPageLists] = useState([]);
  const copy = useRef([]);

  let buttons;

  useEffect(() => {
    getLen(page)
      .then(res => {
        dbKey.current = res;
        setOn2(true);
      })
  }, [])

  function pageMove(moveNum) {
    if (searchParams.get('search')) router.push(`${pathName}?page=${moveNum + 1}&category=${searchParams.get('category')}&search=${searchParams.get('search')}`);
    else router.push(`${pathName}?page=${moveNum + 1}`)
    setOn(false);
  }

  useEffect(() => {
    if (on2) {
      const dbLen = Object.keys(dbKey.current)
      for (let i = 0; i < dbLen.length; i = i + 10) {
        let pageList = dbLen.slice(i, i + 10);
        copy.current.push(pageList)
        setPageLists(copy.current);
      }
    }
  }, [on2])

  buttons = pageLists.map((key, index) => {
    return <button key={index} onClick={() => pageMove(index)}>{index + 1}</button>
  })

  return (
    <div className={classes.Pagination}>
      {buttons}
    </div>
  )
}

