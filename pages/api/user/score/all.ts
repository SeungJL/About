import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../../libs/dbConnect";
import { User } from "../../../../models/user";

import { getParticipationRate } from "../../../../services/rateService";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const token = await getToken({ req, secret });

  // if (!token || !token.uid || !token.accessToken) {
  //   res.status(401).end();
  //   return;
  // }

  //게스트 로그인도 확인이 가능한 부분이라서 주석처리 해두겠습니다.
  await dbConnect();

  switch (method) {
    case "GET":
      const userScore = await User.collection
        .aggregate([
          {
            $match: {
              isActive: true,
            },
          },
          {
            $project: {
              _id: false,
              name: 1,
              score: 1,
            },
          },
        ])
        .toArray();

      return res.status(200).send(userScore);
      break;
  }
}
