import React from 'react';
import classes from './PostingContent.module.css'

export default function PostingContent({postingData}) {
  return (
    <div className={classes.PostingContent} dangerouslySetInnerHTML = { {__html: postingData.content} }>
    </div>
  )
}
