import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import dbConnect from "../../../libs/backend/dbConnect";
import clientPromise from "../../../libs/backend/mongodb";
import {
  getProfile,
  refreshAccessToken,
} from "../../../libs/backend/oauthUtils";
import { Account } from "../../../models/account";
import { User } from "../../../models/user";
import { Role } from "../../../types/user/user";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    //직접적으로 사용자 정보를 인증하는 경우
    CredentialsProvider({
      id: "guest",
      name: "guest",
      //추가적인 입력 필드
      credentials: {},

      async authorize(credentials, req) {
        //자격 증명 로직 추가 가능
        const profile = {
          id: "0",
          uid: "0",
          name: "guest",
          role: "member",
          profileImage: "",
          isActive: true,
        };
        //반환되는 값은 jwt의 user에 저장된다
        if (profile) return profile;
        //오류를 사용자에게 보여주고 싶으면 추가로 작성
        return null;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
      profile: (profile) => ({
        id: profile.id.toString(),
        uid: profile.id.toString(),
        name: profile.properties.nickname,
        role: "human",
        profileImage: profile.properties.profile_image,
        isActive: false,
        score: 0,
      }),
    }),
  ],
  //DB랑 연결하고 유저 정보를 조회한다. 기본적으로 accounts와 users에서.
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    //자동 로그아웃
    maxAge: 30 * 24 * 60 * 60, // 30 days
    //세션 정보 업데이트
    updateAge: 3 * 24 * 60 * 60, // 3 days
  },
  pages: {
    //로그인 할 때 보여질 페이지
    signIn: "/login",
    //로그아웃이나 에러날 때 등 보여질 페이지 추가 가능
  },
  callbacks: {
    //user은 위에서 만든 profile, account는 계정 정보
    //반환값이 true면 인증 성공했다는 뜻
    //false면 nextAuth의 반환 실패메세지
    async signIn({ user, account }) {
      
      if (account.provider === "guest") return true;

      const accessToken: any = account.access_token;
      if (!accessToken) return false;

      const kakaoProfile = await getProfile(accessToken, user.uid as string);
      if (!kakaoProfile) return false;

      await dbConnect();
      //해당 uid가 존재하는 경우에는 카카오 프로필만 업데이트
      await User.updateOne({ uid: user.uid }, { $set: kakaoProfile });

      return true;
    },
    //session과 token모두 초기값인데, 이전 과정에서 겹치는 부분들은 업데이트가 되어있음
    async session({ session, token }) {
      if (session.user.name === "guest") {
        session.id = "0";
        session.uid = "0";
        session.role = "guest";
        session.error = "";
        session.isActive = false;
      } else {
        session.id = token.id.toString();
        session.uid = token.uid.toString();
        session.user.name = token.name;
        session.role = token.role as Role;
        session.error = token.error;
        session.isActive = token.isActive as boolean;
      }
      return session;
    },
    //token 빼고는 모두 초기값으로 undefined
    //
    async jwt({ token, account, profile, user }) {
      if (account && account.provider === "guest") {
        return token;
      }
      if (account && user) {
        await Account.updateOne(
          { providerAccountId: account.providerAccountId },
          {
            $set: {
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              refresh_token_expires_in: account.refresh_token_expires_in,
            },
          }
        );
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          id: user.id.toString(),
          uid: (profile as any)?.id,
          name: (profile as any)?.properties?.nickname,
          picture: (profile as any)?.properties?.profile_image,
          role: user.role,
          isActive: user.isActive,
        };
      }

      if (token.accessTokenExpires) {
        if (Date.now() < (token.accessTokenExpires as number) * 1000) {
          return token;
        }
        return refreshAccessToken(token);
      } else {
        return token;
      }
    },
  },
};
export default NextAuth(authOptions);
