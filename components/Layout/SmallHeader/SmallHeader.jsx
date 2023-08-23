import React, { memo } from 'react';
import classes from './SmallHeader.module.css';
import Link from 'next/link';

function SmallHeader() {
  return (
    <div className={classes.SmallHeader}>
      <h1><Link href="https://website-eight-cyan-86.vercel.app/">Crash</Link></h1>
    </div>
  )
}

export default memo(SmallHeader);
