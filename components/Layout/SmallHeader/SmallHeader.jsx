import React from 'react';
import classes from './SmallHeader.module.css';
import Link from 'next/link';

export default function SmallHeader() {
  return (
    <div className={classes.SmallHeader}>
      <h1><Link href="https://website-eight-cyan-86.vercel.app/">대문</Link></h1>
    </div>
  )
}
