"use client"

import React from 'react';
import classes from './PostingBtn.module.css';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function PostingBtn({page}) {
  const { status } = useSession();
  const router = useRouter();

  function PostingBtn() {
    if(status === "authenticated") router.push(`${page}/new`)
    else alert("로그인 해주세요")
  }
  return (
    <div className={classes.PostingBtn} onClick={PostingBtn}>
      글쓰기
    </div>
  )
}
