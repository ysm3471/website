"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react';
import classes from './Login.module.css'

export default function Login() {
  const { data: session, status } = useSession();

  return (
    <div className={classes.Login}>
    {session?.user ? (
      <>
        <p className="text-sky-600"> {session.user.email}</p>
        <div onClick={() => signOut()}>
          Sign Out
        </div>
      </>
    ) : (
      <div onClick={() => signIn()}>
        Sign In
      </div>
    )}
  </div>
  )
}
