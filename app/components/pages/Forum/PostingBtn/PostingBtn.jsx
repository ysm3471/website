"use client"

import React from 'react';
import classes from './PostingBtn.module.css';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';

export default function PostingBtn() {
  const { status } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  function PostingBtn() {
    if(status === "authenticated") router.push(`${pathName}/new`)
    else alert("로그인 해주세요")
  }
  return (
    <div className={classes.PostingBtn} onClick={PostingBtn}>
      글쓰기
    </div>
  )
}
