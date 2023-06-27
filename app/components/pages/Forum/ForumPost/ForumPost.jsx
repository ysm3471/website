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
  const postingListCopy = useRef([]);

  let postingList;

  useEffect(() => {
    let recentPostRef;
    let pagenum = 1;
    if (searchParams && searchParams.page) pagenum = searchParams.page
    if (searchParams && searchParams.search) {} 
    if (page === "all") {
      recentPostRef = query(ref(db, 'user-posts/post'), limitToLast(pagenum * 10))    // 페이지에 맞춰서 10개씩만 불러옴
    }  
    else {
      recentPostRef = query(ref(db, 'user-posts/post'), orderByChild("tag1"), equalTo(page), limitToLast(pagenum * 10))   // 지정한 게시판의 데이터만 불러옴
    }
    onValue(recentPostRef, (snapshot) => {
      postingData.current = snapshot.val();
      setOn(true);
    });
  }, [searchParams])

  if (on && postingData.current) {
    let pagenum = 1;
    if (searchParams && searchParams.page) pagenum = searchParams.page
    postingListCopy.current = Object.keys(postingData.current).reverse()
    postingListCopy.current = postingListCopy.current.slice((pagenum - 1) * 10, pagenum * 10);

    postingList = postingListCopy.current.map((key, index) => {
      const postingContent = postingData.current[key]
      if (page === "all") {
        return <Post key={key} tag2={postingContent.tag2} title={postingContent.title} page={page} id={key} thumbnail={postingContent.thumbnail} time={postingContent.time} userName={postingContent.username} />
      }
      else {
        if (page === postingContent.tag1) return <Post key={key} tag2={postingContent.tag2} title={postingContent.title} page={page} id={key} thumbnail={postingContent.thumbnail} time={postingContent.time} userName={postingContent.username} />
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
