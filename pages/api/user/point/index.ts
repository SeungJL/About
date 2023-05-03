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
  const { point } = req.body;

  const token = await getToken({ req, secret });

  if (!token || !token.uid || !token.accessToken) {
    res.status(401).end();
    return;
  }

  await dbConnect();

  switch (method) {
    case "GET":
      const userPoint = await User.findOne({ uid: token.uid }, "-_id + point");
      res.status(200).send(userPoint);
      break;

    case "POST":
      const user = await User.findOne({ uid: token.uid });
      user.point = user.point + point;
      await user.save();
      res.status(200).send({});
      break;
  }
}
