"use client"

import React from 'react';
import classes from './PostingBtn.module.css';
// import { useSession } from "next-auth/react";
import { usePathname, useRouter } from 'next/navigation';

export default function PostingBtn() {
  /* const { status } = useSession();    // 현재 로그인 상태를 가져옴 */
  const router = useRouter();
  const pathName = usePathname();

  function PostingBtn() {   // 로그인 했을 경우에만 글을 작성할 수 있음
/*     if(status === "authenticated") 
    else alert("로그인 해주세요") */

    router.push(`${pathName}/new`)
  }
  return (
    <div className={classes.PostingBtn} onClick={PostingBtn}>
      글쓰기
    </div>
  )
}
