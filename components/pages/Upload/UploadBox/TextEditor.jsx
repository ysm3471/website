"use client" // next js에서 client 컴포넌트임을 명시

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {    // 클라이언트 측에서 동적으로 모듈을 로딩하게 하는 방법. 안하면 오류남
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ]
}

export default function TextEditor({setThumbnail,inputRef }) {
  let text = useRef('');    // youtube url을 저장하는 변수
  const [value,setValue] = useState("")

  if (typeof window === 'object') {
    window.addEventListener('paste', (e) => {   // 붙여넣기를 하면 text에 정보를 저장
      const data = e.clipboardData;
      text.current = data.getData('text');
    })
  }


  useEffect(() => {
    const urlSearch = text.current.search('https://youtu.be/')    // 붙여넣기한 text가 지정된 형식인지 검사

    if (urlSearch === 0) {    // youtube 주소일경우
      setThumbnail(text.current);   // 썸네일에 붙여넣기한 주소를 저장
      let youtubeUrl = text.current.replace('https://youtu.be/', 'https://youtube.com/embed/')   // youtube 링크를 iframe 형식에 맞춰서 주소 변환
      const iframeUrl = `<iframe
      width="590"
      height="315"
      src="${youtubeUrl}"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      >
    </iframe>`
      let copy = inputRef.current
      if (copy !== "") {    // 맨 처음 작성 시 value값이 공백으로 인식될 때를 위한 코드
        copy = inputRef.current.replace(text.current, iframeUrl)
        setValue(copy)
      }
      else setValue(iframeUrl)  // 주소 변환한 값으로 작성글에 저장
    }
    text.current = '' // 붙여넣기한 값을 저장한 변수 초기화
  }, [text.current])

  function textChange(e) {
    inputRef.current = e;
    setValue(inputRef.current)
  }

  return (
      <QuillNoSSRWrapper modules={modules} value={value} onChange={textChange} theme="snow" />
  )

}
