import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver";
//  배포시에는 웹에 key변수를 입력하게 되는데 vercel은 두가지 키를 추가로 필요로 함
// NEXTAUTH_URL는 배포할 url, NEXTAUTH_SECRET는 아래 secret에 써 놓은 키
// openssl rand -base64 32 를 사용해 깃배쉬에서 키를 만들고 그걸 적으면 됨
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