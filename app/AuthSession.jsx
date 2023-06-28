'use client';

import { SessionProvider } from "next-auth/react";    // next-auth의 session에 접근할 수 있게 해주는 provider

export default function AuthSession({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}