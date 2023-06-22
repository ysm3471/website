import React from 'react';
import classes from './Forum.module.css'
import Nav from '../../Layout/Nav';
import ForumPost from './ForumPost/ForumPost';
import SmallHeader from '../../Layout/SmallHeader/SmallHeader';

export default function Forum({title,page}) {
  return (
    <div className={classes.container}>
      <SmallHeader/>
      <Nav/>
      <main>
        <ForumPost title={title} page={page}/> 
      </main>
    </div>
  )
}
