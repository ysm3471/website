import React from 'react';
import classes from './HomeHeader.module.css'
import Nav from '../Nav';

export default function HomeHeader() {
  return (
    <div className={classes.Header}>
      <h1>대문</h1>
      <Nav />
    </div>
  )
}
