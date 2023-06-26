"use client"

import React, { useEffect, useRef, useState } from 'react';
import classes from './ForumPost.module.css'
import PostListTitle from '@/app/components/Main/PostList/PostListTitle';
import Notice from '@/app/components/Main/PostList/Post/Notice';
import Post from '@/app/components/Main/PostList/Post/Post';
import Pagination from '../Pagination/Pagination';
import PostingBtn from '../PostingBtn/PostingBtn';
import Search from '../Search/Search';
import { getDatabase, onValue, ref, child, get, query, limitToLast, limitToFirst, orderByChild, equalTo } from 'firebase/database'
import { app } from '@/Firebase/FIrebaseClient';


export default function ForumPost({ title, page, searchParams }) {
  const db = getDatabase(app);
  const postingData = useRef();
  const [on, setOn] = useState(false);
  const [pagelen, setPagelen] = useState();
  const postingLists = useRef([]);

  let postingList;
  

  useEffect(() => {
    let recentPostRef;
    let pagenum = 1;
    if (searchParams.page) pagenum = searchParams.page
    console.log(pagenum,'pagenum')
    if (page === "all") {
      recentPostRef = query(ref(db, 'user-posts/post'), limitToLast(pagenum * 10))
    }   // 20개가 불러와져야하는데 안 됨 ㅜㅠ
    else {
      recentPostRef = query(ref(db, 'user-posts/post'), orderByChild("tag1"), equalTo(page), limitToLast(pagenum * 10))
    }
    onValue(recentPostRef, (snapshot) => {
      postingData.current = snapshot.val();
      setOn(true);
    });
  }, [searchParams])

  if (on) {
    let pagenum = 1;
    if (searchParams.page) pagenum = searchParams.page
    postingLists.current = Object.keys(postingData.current).reverse()
    console.log(postingLists.current,'what??');
    postingLists.current = postingLists.current.slice((pagenum-1) * 10, pagenum * 10);

    postingList = postingLists.current.map((key, index) => {
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
      <PostingBtn page={page} />
      <Pagination searchParams={searchParams} page={page} pagelen={pagelen} />
      <Search />
    </div>
  )
}
