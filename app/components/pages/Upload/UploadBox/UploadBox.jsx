"use client"
import React, { useEffect, useState } from 'react';
import classes from './UploadBox.module.css'
import TextEditor from './TextEditor';  // react-quill을 사용한 text-editor
import writeUserData from '@/Firebase/Write/writeUserData';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function UploadBox({ forum }) {
  const { data: session, status } = useSession();

  const [tag1,setTag1] = useState(forum);
  const [tag2,setTag2] = useState('music');
  const [title,setTitle] = useState('');
  const [album,setAlbum] = useState('');
  const [value,setValue] = useState('');
  const [tag,setTag] = useState('');
  const [thumbnail,setThumbnail] = useState('');

  const router = useRouter();
  
  useEffect(() => {   // 글쓰기 도중 로그아웃이 될 경우
    if(status === "unauthenticated") {
      alert("로그인 후에 글을 작성할 수 있습니다");
      router.back();
    }
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    const userName = session.user.email.split('@') // 아이디에서 이메일부분을 잘라서 저장
    const today = new Date();
    const time = today.getTime();   // 작성 기준 시간정보를 초단위로 저장

    if(title && value) {
      writeUserData(userName[0],tag1,tag2,title,album,value,tag,thumbnail,time)
      router.back();      
    }
    else {
      alert('제목과 내용을 입력해주세요')   // 제목과 내용은 필수
    }
  }

return (
  <form onSubmit={handleSubmit} className={classes.UploadBox}>
    <div className={classes.category}>
      <select className={classes.forum} defaultValue={forum} onChange={(e)=>setTag1(e.target.value)}>
        <option value="korea">국내/K-POP</option>
        <option value="pop">팝송</option>
        <option value="asia">아시아</option>
      </select>
      <select className={classes.option} defaultValue="music" onChange={(e)=>setTag2(e.target.value)}>
        <option value="music">음원</option>
        <option value="live">라이브</option>
      </select>
    </div>
    <div className={classes.title}>
      <input type="text" className={classes.name} placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" className={classes.album} placeholder="앨범명(선택)" value={album} onChange={(e) => setAlbum(e.target.value)} />
    </div>
    <TextEditor value={value} setValue={setValue} setThumbnail={setThumbnail} />
    <div className={classes.tag}>
      <input type="text" placeholder='#태그(선택)' value={tag} onChange={(e) => setTag(e.target.value)} />
    </div>
    <button className={classes.submitBtn} type='submit'>등록</button>
  </form>
)
}
