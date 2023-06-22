import React from 'react';
import classes from './Detail.module.css';
import Nav from '../../Layout/Nav';
import SmallHeader from '../../Layout/SmallHeader/SmallHeader';
import PostingDetail from './PostingDetail/PostingDetail';
import PostingContent from './PostingContent/PostingContent';
import Postingrecommend from './Postingrecommend/Postingrecommend';
import Postingtag from './Postingtag/Postingtag';
import Postingcomment from './Postingcomment/Postingcomment';

export default function Forum() {
  return (
    <div className={classes.container}>
      <SmallHeader/>
      <Nav/>
      <main>
        <div className={classes.posting}>
          <PostingDetail/>
          <PostingContent/>      
          <Postingrecommend/>  
          <Postingtag/>  
          <Postingcomment/>
        </div>
      </main>
    </div>
  )
}
