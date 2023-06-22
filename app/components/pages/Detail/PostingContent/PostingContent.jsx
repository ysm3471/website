import React from 'react';
import classes from './PostingContent.module.css'

export default function PostingContent() {
  return (
    <div className={classes.PostingContent}>
      <div>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/SsBWxd6hyg8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>        
      </div>
      <img src="/img/안녕나의사랑.png" alt="" />
    </div>
  )
}
