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

  //게스트 작업중인데 해당 코드 일단 없어도 되는 거 같아서 주석 처리 해 놓을게요!
  // const token = await getToken({ req, secret });

  // if (!token || !token.uid || !token.accessToken) {
  //   res.status(401).end();
  //   return;
  // }

  await dbConnect();

  switch (method) {
    case "GET":
      const userPoint = await User.find(
        {},
        "-_id name + uid + point + location"
      );

      console.log(userPoint);

      res.status(200).send(userPoint);
      break;
  }
}
