"use client"

import React, { useEffect, useRef, useState } from 'react';
import classes from './ForumPost.module.css'
import PostListTitle from '@/app/components/Main/PostList/PostListTitle';
import Notice from '@/app/components/Main/PostList/Post/Notice';
import Post from '@/app/components/Main/PostList/Post/Post';
import Pagination from '../Pagination/Pagination';
import PostingBtn from '../PostingBtn/PostingBtn';
import Search from '../Search/Search';
import { getDatabase, onValue, ref, query, limitToLast, orderByChild, equalTo } from 'firebase/database'
import { app } from '@/Firebase/FIrebaseClient';

export default function ForumPost({ title, page, searchParams }) {
  const db = getDatabase(app);
  const postingData = useRef();
  const [on, setOn] = useState(false);
  const postingDataCopy = useRef([]);   // postingData를 편집하기 위한 변수

  let postingList;

  useEffect(() => {
    let recentPostRef;    // postRef를 저장하는 변수
    let pagenum = 1;    // page정보를 저장하는 변수
    if (searchParams && searchParams.page) pagenum = searchParams.page    // page의 params가 있을 경우 pagenum에 정보를 저장
    if (page === "all") {   // 전체 게시판일 경우
      recentPostRef = query(ref(db, 'user-posts/post'), limitToLast(pagenum * 10))    // 페이지에 맞춰서 10개씩만 불러옴
    }  
    else {    // 특정 게시판일 경우
      recentPostRef = query(ref(db, 'user-posts/post'), orderByChild("tag1"), equalTo(page), limitToLast(pagenum * 10))   // 지정한 게시판의 데이터만 10개씩 불러옴
    }
    onValue(recentPostRef, (snapshot) => {
      postingData.current = snapshot.val();
      setOn(true);
    });
  }, [searchParams])

  if (on && postingData.current) {
    let pagenum = 1;
    if (searchParams && searchParams.page) pagenum = searchParams.page
    postingDataCopy.current = Object.keys(postingData.current).reverse()    // 불러온 데이터를 최신순으로 배치
    postingDataCopy.current = postingDataCopy.current.slice((pagenum - 1) * 10, pagenum * 10);    // 불러온 데이터를 현재 페이지 정보에 맞게 자름

    postingList = postingDataCopy.current.map((key, index) => {
      const postingContent = postingData.current[key]
      if (page === "all") {
        return <Post key={key} page={page} id={key} postingContent={postingContent}/>
      }
      else {
        if (page === postingContent.tag1) return <Post key={key} page={page} id={key} postingContent={postingContent}/>
      }
    }
    )
  }

  return (
    <div>
      <div className={classes.title}>
        <PostListTitle title={title} />
      </div>
      <div className={classes.notice}>
        <Notice />
      </div>
      {postingList}
      <PostingBtn />
      <Pagination setOn={setOn} page={page} />
      <Search searchParams={searchParams} />
    </div>
  )
}
