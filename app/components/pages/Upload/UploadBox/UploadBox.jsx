import React from 'react';
import classes from './UploadBox.module.css'
import TextEditor from './TextEditor';

export default function UploadBox({forum}) {

  return (
    <form className={classes.UploadBox}>
      <div className={classes.category}>
        <select className={classes.forum} defaultValue={forum}>
          <option value="korea">국내/K-POP</option>
          <option value="pop">팝송</option>
          <option value="asia">아시아</option>
        </select>
        <select className={classes.option} defaultValue="music">
          <option value="music">음원</option>
          <option value="live">라이브</option>
        </select>
      </div>
      <div className={classes.title}>
        <input type="text" className={classes.name} placeholder="제목" />
        <input type="text" className={classes.album} placeholder="앨범명(선택)" />
      </div>
      <TextEditor/>
      <div className={classes.tag}>
        <input type="text" placeholder='#태그' />
      </div>
      <button className={classes.submitBtn}>등록</button>
    </form>
  )
}
