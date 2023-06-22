import React from 'react';
import classes from './Homepost.module.css'
import PostListTitle from '@/app/components/Main/PostList/PostListTitle';
import Notice from '@/app/components/Main/PostList/Post/Notice';
import Post from '@/app/components/Main/PostList/Post/Post';
import Link from 'next/link';


export default function HomePost() {
  return (
    <div className={classes.PostList}>
      <PostListTitle title="최근 게시물"/>
      <Notice/>
      <div className={classes.postWrap}>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <div className={classes.more}><Link href="/all">더보기 {`\u003e`}</Link></div>
      </div>
    </div>
  )
}
