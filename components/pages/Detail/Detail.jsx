"use client"

import React, { useEffect, useRef, useState } from 'react';
import classes from './Detail.module.css';
import Nav from '../../Layout/Nav';
import SmallHeader from '../../Layout/SmallHeader/SmallHeader';
import PostingDetail from './PostingDetail/PostingDetail';
import PostingContent from './PostingContent/PostingContent';
import Postingrecommend from './Postingrecommend/Postingrecommend';
import Postingtag from './Postingtag/Postingtag';
import Postingcomment from './Postingcomment/Postingcomment';
import { getDatabase, ref, child, get, remove } from "firebase/database";
import { app } from '@/Firebase/FIrebaseClient';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Forum({ params }) {
  const dbRef = ref(getDatabase(app));
  const router = useRouter();
  const { data: session} = useSession();
  const [on,setOn] = useState(false);
  const postingData = useRef();   // db에서 불러온 post를 저장하는 변수

  useEffect(() => {   // post에 들어가면 db에서 해당 key값을 가진 post를 불러옴
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
  },[])

  function removePosting() {    // post를 삭제하는 함수
    if(session) {   // 로그인 한 경우에만 이용 가능
      const userName = session.user.email.split('@')
      console.log(userName[0])

      if(userName[0] ===  postingData.current.username) {   // 작성한 유저와 이름이 같을 경우만 삭제 가능
        const result = window.confirm("정말 삭제하시겠습니까?")
        if (result) {
          alert("게시물이 삭제되었습니다")
          remove(child(dbRef, `user-posts/post/${params.slug}`));
          router.back();      
        }      
      }
      else alert("작성자만 삭제할 수 있습니다")      
    }
    else alert("로그인 후 이용 가능합니다")
  }

  return (
    <>
      {on ? <div className={classes.container}>
        <SmallHeader />
        <Nav />
        <main>
          <div className={classes.posting}>
            <PostingDetail postingData={postingData.current} removePosting={removePosting}/>
            <PostingContent postingData={postingData.current}/>
            <Postingrecommend postingData={postingData.current}/>
            <Postingtag postingData={postingData.current}/>
            <Postingcomment />
          </div>
        </main>
      </div> : null }   
    </>

  )
}
