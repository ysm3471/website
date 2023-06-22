import React from 'react';
import classes from './PostListTitle.module.css'

export default function PostListTitle({title}) {
  return (
    <div className={classes.PostListTitle}>
      <h2>{title}</h2> 
    </div>
  )
}
