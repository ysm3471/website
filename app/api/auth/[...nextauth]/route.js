import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver";

export const authOptions = NextAuth({
  providers: [
    NaverProvider({
      clientId: "hsyLUk628d9fW_PmYpoO",
      clientSecret: "8l0vBTqs3z"
    })
  ],
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