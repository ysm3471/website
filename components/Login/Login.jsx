"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react';
import classes from './Login.module.css'

export default function Login() {
  const { data: session } = useSession();

  return (
    <div className={classes.Login}>
    {session?.user ? (
      <>
        <p> {session.user.email}</p>
        <div onClick={() => signOut('naver')}>
          로그아웃
        </div>
      </>
    ) : (
      <div onClick={() => signIn('naver')}>
        Naver 로그인
      </div>
    )}
  </div>
  )
}
