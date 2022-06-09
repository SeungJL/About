import axios, { AxiosError } from "axios"
import { JWT } from "next-auth/jwt"
import { Attendence } from "../models/attendence"
import { IUser, User } from "../models/user"
import dbConnect from "./dbConnect"
import clientPromise from "./mongodb"
import { Dayjs } from "dayjs"
import { getOptimalPlace } from "./placeUtils"
import { getOptimalTime } from "./timeUtils"

export const getRefreshedAccessToken = async (uid: string, refreshToken: string) => {
  const token: JWT = {
    uid,
    refreshToken,
  }

  const refreshed = await refreshAccessToken(token)

  return refreshed['accessToken']
}

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

export const sendResultMessage = async (
  accessToken: string,
  refreshToken: string,
  uid: string,
  date: Dayjs,
  isOpen: boolean,
  time: string,
  place: string
) => {
  const dateKr = date.format('MM/DD')
  const resultMessage = isOpen ?
    `내일(${dateKr}) 스터디는 ${time}에 ${place}에서 열립니다` :
    `내일(${dateKr}) 스터디가 열리지 못 했어요`

  const url= 'https://kapi.kakao.com/v2/api/talk/memo/default/send?'

  const message = JSON.stringify({
    object_type: 'text',
    text: resultMessage,
    link: {
        web_url: `${process.env.NEXTAUTH_URL}/result`,
        mobile_web_url: `${process.env.NEXTAUTH_URL}/result`,
    },
    button_title: "결과 확인"
  })

  try {
    await axios.post(url, `template_object=${message}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  } catch (error) {
    const axiosError = error as AxiosError
    if ((axiosError.response.data as {msg: string, code: number}).code === -401) {
      const accessToken = await getRefreshedAccessToken(uid, refreshToken)

      try {
        await axios.post(url, `template_object=${message}`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error(error)
    }
  }
}

export const sendResultMessages = async (date: Dayjs) => {
  await dbConnect()
  const client = await clientPromise

  const attendence = await Attendence.findOne({date: date.toDate()}).populate('participants.user')

  const users = attendence.participants.map((p) => (p.user as IUser))
  const accounts = await client.db('votehelper').collection('accounts').find({userId: {$in: users.map(u => u._id)}}).toArray()

  if (attendence.participants.length < 3) {
    const promises = accounts.map((account) => {
      const accessToken = account.access_token as string
      const refreshToken = account.refresh_token as string
      const uid = account.providerAccountId

      return sendResultMessage(accessToken, refreshToken, uid, date, false, '', '')
    })

    return await Promise.all(promises)
  }

  const meetingTime = attendence.meetingTime ? attendence.meetingTime : getOptimalTime(attendence.participants.map((p) => p.time))
  const meetingPlace = attendence.meetingPlace ? attendence.meetingPlace : getOptimalPlace(attendence.participants.map((p) => p.place))

  if (!attendence.meetingPlace || !attendence.meetingTime) {
    const updateField = Object.assign({},
      meetingTime && { meetingTime },
      meetingPlace && { meetingPlace },
    )

    await Attendence.updateOne({date: date.toDate()}, { $set: updateField })
  }

  const promises = accounts.map((account) => {
    const accessToken = account.access_token as string
    const refreshToken = account.refresh_token as string
    const uid = account.providerAccountId

    return sendResultMessage(accessToken, refreshToken, uid, date, true, meetingTime, meetingPlace)
  })

  return await Promise.all(promises)
}

export const withdrawal = async (accessToken: string) => {
  const url = 'https://kapi.kakao.com/v1/user/unlink'

  let uid: string 
  try {
    const response = await axios.post(url, {}, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    uid = response.data.id.toString()
    console.log(response)
  } catch (error) {
    const axiosError = error as AxiosError
    console.error(axiosError)
  }
  
  if (uid) {
    await dbConnect()
    const client = await clientPromise

    const user = await User.findOne({ uid })

    await Attendence.updateMany({}, {$pull: { participants: {user: user._id} }})
    await client.db('votehelper').collection('accounts').deleteMany({providerAccountId: uid})
    await User.deleteMany({ uid })
  }
  return
}