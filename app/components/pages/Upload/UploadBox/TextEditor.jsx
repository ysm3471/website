"use client" // next js에서 client 컴포넌트임을 명시

import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from './TextEditor.module.css'


export default function TextEditor() {
  const [value, setValue] = useState('');
  let text = useRef('');

  window.addEventListener('paste', (e) => {
    const data = e.clipboardData;
    text.current = data.getData('text')
  })

  useEffect(() => {
    const urlSearch = text.current.search('https://youtu.be/')

    if (urlSearch === 0) {
      let youtubeUrl = text.current.replace('https://youtu.be/','https://youtube.com/embed/')   // youtube 링크를 iframe 형식에 맞춰서 주소 변환
      let copy = value.replace(text.current, `<iframe
        width="590"
        height="315"
        src="${youtubeUrl}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>`)

      setValue(copy)
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
