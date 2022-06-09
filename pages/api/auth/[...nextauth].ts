import NextAuth from 'next-auth'
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import KakaoProvider from 'next-auth/providers/kakao'
import clientPromise from '../../../libs/mongodb';
import axios from 'axios';
import { User } from '../../../models/user';
import dbConnect from '../../../libs/dbConnect';
import { refreshAccessToken } from '../../../libs/oauthUtils';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
      profile: (profile) => ({
        id: profile.id.toString(),
        uid: profile.id.toString(),
        name: profile.properties.nickname,
        role: 'stranger',
        thumbnailImage: profile.properties.thumbnail_image,
        profileImage: profile.properties.profile_image,
      }),
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 3 * 24 * 60 * 60, // 3 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      const accessToken = account.access_token

      if (!accessToken) {
        return false
      }

      const res = await axios.get('https://kapi.kakao.com/v1/api/talk/profile', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (res.status !== 200) {
        return false
      }

      await dbConnect()

      await User.updateOne({uid: user.uid}, {$set: {
        name: res.data.nickName,
        thumbnailImage: res.data.thumbnailURL,
        profileImage: res.data.profileImageURL,
      }})

      return true
    },
    async session({ session, token }) {
        session.uid = token.uid.toString()
        session.user.name = token.name
        session.role = token.role
        session.error = token.error
        return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          id: user.id.toString(),
          uid: (profile as any)?.id,
          name: (profile as any)?.properties?.nickname,
          picture: (profile as any)?.properties?.profile_image,
          role: user.role,
        }
      }
      if (Date.now() < (token.accessTokenExpires as number) * 1000) {
        return token
      }

      return refreshAccessToken(token)
    },
  }
})
