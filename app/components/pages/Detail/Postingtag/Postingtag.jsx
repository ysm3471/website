import React from 'react';
import classes from './Postingtag.module.css'

export default function Postingtag({postingData}) {
  return (
    <div className={classes.Postingtag}>{postingData.tag}</div>
  )
}
