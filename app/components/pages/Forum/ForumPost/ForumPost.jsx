import React from 'react';
import classes from './ForumPost.module.css'
import PostListTitle from '@/app/components/Main/PostList/PostListTitle';
import Notice from '@/app/components/Main/PostList/Post/Notice';
import Post from '@/app/components/Main/PostList/Post/Post';
import Pagination from '../Pagination/Pagination';
import PostingBtn from '../PostingBtn/PostingBtn';
import Search from '../Search/Search';

export default function ForumPost({title,page}) {
  return (
    <div>
      <div className={classes.title}>
        <PostListTitle title={title}/>
      </div>
      <div className={classes.notice}>
        <Notice/>
      </div>
      <Post page={page}/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
      <PostingBtn page={page}/>
      <Pagination/>
      <Search/>
    </div>
  )
}
