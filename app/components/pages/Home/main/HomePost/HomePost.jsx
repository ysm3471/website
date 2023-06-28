"use client"
import React, { useEffect, useRef, useState } from 'react';
import classes from './Homepost.module.css'
import PostListTitle from '@/app/components/Main/PostList/PostListTitle';
import Notice from '@/app/components/Main/PostList/Post/Notice';
import Post from '@/app/components/Main/PostList/Post/Post';
import Link from 'next/link';
import { getDatabase, ref, query, limitToLast, onValue } from 'firebase/database'
import { app } from '@/Firebase/FIrebaseClient';


export default function HomePost() {
  const db = getDatabase(app);
  const postingData = useRef();
  const [on, setOn] = useState(false);

  let postingList;

  useEffect(() => {
    const recentPostRef = query(ref(db, 'user-posts/post'), limitToLast(7))   // 마지막 게시물부터 7번째 게시물까지만 가져옴

    onValue(recentPostRef, (snapshot) => {
      postingData.current = snapshot.val();
      setOn(true);
    });
  }, [])

  if (on) {   // 준비가 되면 postingList 생성
    postingList = Object.keys(postingData.current).reverse().map((key, index) => {   // 최신 게시물부터 보여주기 위해서 역순으로 배열 생성
      const postingContent = postingData.current[key]
      return <Post key={key} id={key} postingContent={postingContent} />
    })
  }
  return (
    <div className={classes.PostList}>
      <PostListTitle title="최근 게시물" />
      <Notice />
      <div className={classes.postWrap}>
        {postingList}
        <div className={classes.more}><Link href="/all">더보기 {`\u003e`}</Link></div>
      </div>
    </div>
  )
}
