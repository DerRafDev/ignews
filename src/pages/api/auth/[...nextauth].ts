import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

    //this is for the Authentication from GitHub
export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],

  database: process.env.DATABASE_URL,
})
