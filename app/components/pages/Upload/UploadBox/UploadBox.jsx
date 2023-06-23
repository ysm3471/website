"use client"
import React, { useState } from 'react';
import classes from './UploadBox.module.css'
import TextEditor from './TextEditor';
import writeUserData from '@/Firebase/Write/writeUserData';
import { useRouter } from 'next/navigation';

export default function UploadBox({ forum }) {
  const [tag1,setTag1] = useState('korea');
  const [tag2,setTag2] = useState('music');
  const [title,setTitle] = useState('');
  const [album,setAlbum] = useState('');
  const [value,setValue] = useState('');
  const [tag,setTag] = useState('');
  const [thumbnail,setThumbnail] = useState('');

  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if(title && value) {
      writeUserData('1234','gildong',tag1,tag2,title,album,value,tag,thumbnail)
      router.back();      
    }
    else {
      alert('제목과 내용을 입력해주세요')
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
