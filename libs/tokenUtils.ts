import axios from "axios"
import { JWT } from "next-auth/jwt"
import clientPromise from "./mongodb"

export const refreshAccessToken = async (token: JWT) => {
  try {
    const url =
      "https://kauth.kakao.com/oauth/token?" +
      new URLSearchParams({
        client_id: process.env.KAKAO_CLIENT_ID as string,
        client_secret: process.env.KAKAO_CLIENT_SECRET as string,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
      })
    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })

    const refreshedTokens = response.data

    if (response.status !== 200) {
      throw refreshedTokens
    }

    const updateFields = Object.assign({},
      refreshedTokens.access_token && {access_token: refreshedTokens.access_token},
      refreshedTokens.refresh_token && {refresh_token: refreshedTokens.refresh_token},
      refreshedTokens.expires_in && {expires_at: refreshedTokens.expires_in},
      refreshedTokens.refresh_token_expires_in && {refresh_token_expires_in: refreshedTokens.refresh_token_expires_in},
    )

    const client = await clientPromise
    client.db('votehelper').collection('accounts').updateMany({providerAccountId: token.uid.toString()}, { $set: updateFields })

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}