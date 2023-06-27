"use client"

import React, { useState } from 'react';
import classes from './Search.module.css'
import { usePathname, useRouter} from 'next/navigation';

export default function Search() {
  const [value,setValue] = useState("");
  const [category,setCategory] = useState("title")
  const router = useRouter();
  const pathName = usePathname();

  function Change(e) {
    setValue(e.target.value);
  }
  function Change2(e) {
    setCategory(e.target.value)
    console.log(category);
  }

  function onSearch() {
    router.push(`${pathName}?category=${category}&search=${value}`);
  }

  
  return (
    <div className={classes.Search}>
      <select defaultValue="title" onChange={Change2}>
        <option value="title">제목</option>
        <option value="singer">가수</option>        
        <option value="writer">글쓴이</option>
        <option value="tag">태그</option>
      </select>
      <div>
        <input type="text" value={value} onChange={Change}/>
        <button onClick={onSearch}>검색</button>
      </div>
    </div >
  )
}
