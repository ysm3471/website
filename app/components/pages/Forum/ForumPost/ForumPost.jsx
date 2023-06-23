"use client"

import React, { useRef, useState } from 'react';
import classes from './ForumPost.module.css'
import PostListTitle from '@/app/components/Main/PostList/PostListTitle';
import Notice from '@/app/components/Main/PostList/Post/Notice';
import Post from '@/app/components/Main/PostList/Post/Post';
import Pagination from '../Pagination/Pagination';
import PostingBtn from '../PostingBtn/PostingBtn';
import Search from '../Search/Search';
import { getDatabase, ref, child, get } from 'firebase/database'
import { app } from '@/Firebase/FIrebaseClient';

export default function ForumPost({ title, page }) {
  const dbRef = ref(getDatabase(app));
  const postingData = useRef();
  const [on, setOn] = useState(false);

  let postingList;

  get(child(dbRef, `user-posts/1234`))
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
    postingList = Object.keys(postingData.current).slice(0).reverse().map((key, index) => {
      const postingContent = postingData.current[key]
      if (page === "all") {
        return <Post key={key} tag2={postingContent.tag2} title={postingContent.title} page={page} id={key} thumbnail={postingContent.thumbnail} />
      }
      else {
        if (page === postingContent.tag1) return <Post key={key} tag2={postingContent.tag2} title={postingContent.title} page={page} id={key} thumbnail={postingContent.thumbnail}  />
      }
    })
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
      <Pagination />
      <Search />
    </div>
  )
}
