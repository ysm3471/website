import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver";

export const authOptions = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_LOGIN_API_KEY,
      clientSecret: process.env.NAVER_LOGIN_API_SECRET
    })
  ],
  secret:"pzDMh+t0dg0nGnJtP1P+hZbFJu64tBO1nVOI4+G+NzQ=",
  callbacks: {  
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    }
  }
})

export { authOptions as GET, authOptions as POST }