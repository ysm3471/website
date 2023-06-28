"use client"
import React, { useEffect, useRef, useState } from 'react';
import classes from './Pagination.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import getLen from './GetLen';

export default function Pagination({ setOn,page }) {
  const router = useRouter();
  const searchParams = useSearchParams(); // 현재 쿼리 정보를 저장하는 변수
  const dbKey = useRef([]);   // db의 키값을 저장하는 배열(firebase 자체의 문제로 키값만 불러오는 건 다른 조건이 없는 전체 게시판만)
  const [on2, setOn2] = useState(false);    // db와 통신 되었음을 알리는 state
  const [pageLists, setPageLists] = useState([]);   // 불러온 key값을 10개씩 저장하는 배열
  const copy = useRef([]);    // state에 저장하기 전에 임시로 저장하는 배열

  let buttons;

  useEffect(() => {
    getLen(page)    // fetch를 사용해 데이터베이스와 통신하는 함수
      .then(res => {
        dbKey.current = res;
        setOn2(true);
      })
  }, [])

  function pageMove(moveNum) {    // pagination 버튼을 누르면 이동하면서 ForumPost의 정보를 새로 갱신함
    if (searchParams.get('search')) router.push(`/${page}?page=${moveNum + 1}&category=${searchParams.get('category')}&search=${searchParams.get('search')}`);
    else router.push(`/${page}?page=${moveNum + 1}`)
    setOn(false);
  }

  useEffect(() => {   // for문을 쓰기위한 useEffect
    if (on2) {
      const dbLen = Object.keys(dbKey.current)
      for (let i = 0; i < dbLen.length; i = i + 10) {   // 받아온 정보를 10개씩 나눔
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

