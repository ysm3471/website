import React from 'react';
import classes from './HomeBanner.module.css'

export default function HomeBanner() {
  return (
    <div className={classes.HomeBanner}>
      <h2>주인장 추천 라이브</h2>
      <div className={classes.videoWrap}>
        <iframe width="590" height="315" src="https://www.youtube.com/embed/HdkSpALG3A4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        <iframe width="590" height="315" src="https://www.youtube.com/embed/rhBGIWZbHvU" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>        
      </div>
    </div>
  )
}
