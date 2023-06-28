import React from 'react';
import classes from './Upload.module.css';
import Nav from '../../Layout/Nav';
import SmallHeader from '../../Layout/SmallHeader/SmallHeader';
import UploadBox from './UploadBox/UploadBox';


export default function Upload() {
  return (
    <div className={classes.container}>
      <SmallHeader/>
      <Nav/>
      <h2>글쓰기</h2>
      <UploadBox/>
    </div>
  )
}