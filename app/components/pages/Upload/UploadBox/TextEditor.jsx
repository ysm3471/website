"use client" // next js에서 client 컴포넌트임을 명시

import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from './TextEditor.module.css'


export default function TextEditor({value,setValue,setThumbnail}) {
  let text = useRef('');

  window.addEventListener('paste', (e) => {
    const data = e.clipboardData;
    text.current = data.getData('text') 
    
  })

  useEffect(() => {
    const urlSearch = text.current.search('https://youtu.be/')
    
    if (urlSearch === 0) {
      setThumbnail(text.current);
      let youtubeUrl = text.current.replace('https://youtu.be/','https://youtube.com/embed/')   // youtube 링크를 iframe 형식에 맞춰서 주소 변환
      const iframeUrl = `<iframe
      width="590"
      height="315"
      src="${youtubeUrl}"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      >
    </iframe>`
      let copy = value
      if (copy !== "") {    // value값이 공백으로 인식될 때를 위한 코드
        copy = value.replace(text.current, iframeUrl)
        setValue(copy)
      }
      else setValue(iframeUrl)
    }
    text.current = ''
  }, [text.current])

  return (
    <div className={classes.TextEditor}>
      <ReactQuill theme="snow" value={value}
        onChange={setValue} />
    </div>
  )

}
