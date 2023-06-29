import React from 'react';
import classes from './HomeHeader.module.css'
import Nav from '../Nav';

export default function HomeHeader() {
  return (
    <div className={classes.Header}>
      <h1>Crash</h1>
      <Nav />
    </div>
  )
}
