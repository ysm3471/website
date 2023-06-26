import NextAuth from "next-auth"
import NaverProvider from "next-auth/providers/naver";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    NaverProvider({
      clientId: "hsyLUk628d9fW_PmYpoO",
      clientSecret: "8l0vBTqs3z"
    })
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  }
})

export { authOptions as GET, authOptions as POST }