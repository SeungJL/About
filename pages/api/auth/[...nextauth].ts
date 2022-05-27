import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import KakaoProvider from 'next-auth/providers/kakao'
import clientPromise from '../../../libs/mongodb';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
        session.accessToken = token.accessToken
        session.uid = token.uid
        session.user.name = token.name
        return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token = {
          accessToken: account.access_token,
          uid: (profile as any)?.id,
          name: (profile as any)?.properties?.nickname,
          picture: (profile as any)?.properties?.profile_image,
        }
      }
      return token
    },
  }
})