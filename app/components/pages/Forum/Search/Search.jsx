import React from 'react';
import classes from './Search.module.css'

export default function Search() {
  return (
    <div className={classes.Search}>
      <select defaultValue="제목">
        <option value="title">제목</option>
        <option value="singer">가수</option>        
        <option value="writer">글쓴이</option>
        <option value="tag">태그</option>
      </select>
      <form>
        <input type="text" />
        <button>검색</button>
      </form>
    </div>
  )
}
