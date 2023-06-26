"use client"

import React, { useRef, useState } from 'react';
import classes from './Detail.module.css';
import Nav from '../../Layout/Nav';
import SmallHeader from '../../Layout/SmallHeader/SmallHeader';
import PostingDetail from './PostingDetail/PostingDetail';
import PostingContent from './PostingContent/PostingContent';
import Postingrecommend from './Postingrecommend/Postingrecommend';
import Postingtag from './Postingtag/Postingtag';
import Postingcomment from './Postingcomment/Postingcomment';
import { getDatabase, ref, child, get } from "firebase/database";
import { app } from '@/Firebase/FIrebaseClient';

export default function Forum({ params, searcParams }) {
  const dbRef = ref(getDatabase(app));
  const [on,setOn] = useState(false);
  const postingData = useRef();

  get(child(dbRef, `user-posts/post/${params.slug}`))
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

  return (
    <>
      {on && <div className={classes.container}>
        <SmallHeader />
        <Nav />
        <main>
          <div className={classes.posting}>
            <PostingDetail postingData={postingData.current}/>
            <PostingContent postingData={postingData.current}/>
            <Postingrecommend postingData={postingData.current}/>
            <Postingtag postingData={postingData.current}/>
            <Postingcomment />
          </div>
        </main>
      </div> }   
    </>

  )
}
