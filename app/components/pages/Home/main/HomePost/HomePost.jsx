"use client"
import React, { useRef, useState } from 'react';
import classes from './Homepost.module.css'
import PostListTitle from '@/app/components/Main/PostList/PostListTitle';
import Notice from '@/app/components/Main/PostList/Post/Notice';
import Post from '@/app/components/Main/PostList/Post/Post';
import Link from 'next/link';
import { getDatabase, ref, child, get } from 'firebase/database'
import { app } from '@/Firebase/FIrebaseClient';


export default function HomePost() {
  const dbRef = ref(getDatabase(app));
  const postingData = useRef();
  const [on, setOn] = useState(false);

  let postingList;

  get(child(dbRef, `user-posts/post`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        postingData.current = snapshot.val();
        setOn(true);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  if (on) {
    postingList = Object.keys(postingData.current).reverse().map((key, index) => {   // 최신 게시물부터 보여주기 위해서 역순으로 배열 생성
      if(index < 7) {
        const postingContent = postingData.current[key]
        return <Post key={key} tag2={postingContent.tag2} title={postingContent.title} page={postingContent.tag1} id={key} thumbnail={postingContent.thumbnail} time={postingContent.time} userName={postingContent.username} />        
      }
      else return;
    })
  }
  return (
    <div className={classes.PostList}>
      <PostListTitle title="최근 게시물"/>
      <Notice/>
      <div className={classes.postWrap}>
        {postingList}
        <div className={classes.more}><Link href="/all">더보기 {`\u003e`}</Link></div>
      </div>
    </div>
  )
}
