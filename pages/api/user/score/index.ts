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
  const { score, message } = req.body;

  const token = await getToken({ req, secret });

  if (!token || !token.uid || !token.accessToken) {
    res.status(401).end();
    return;
  }

  await dbConnect();

  switch (method) {
    case "GET":
      const userScore = await User.findOne(
        { uid: token.uid },
        "-_id + name + score"
      );
      console.log(userScore);
      res.status(200).send(userScore);
      break;

    case "POST":
      const user = await User.findOne({ uid: token.uid });
      user.score = user.score + score;
      await user.save();
      res.status(200).send({});
      break;

    case "PATCH":
      const users = await User.find({ isActive: true });

      const startDay = dayjs()
        .set("month", dayjs().get("month"))
        .subtract(1, "month")
        .startOf("month")
        .format();
      const endDay = dayjs()
        .set("month", dayjs().get("month"))
        .subtract(1, "month")
        .endOf("month")
        .format();

      const participationRateForm = await getParticipationRate(
        startDay,
        endDay
      );
      users.map(async (user) => {
        const userScore = participationRateForm[user.name];
        if (userScore >= 4) {
          user.score++;
        } else if (userScore === 1) {
          user.score--;
        } else if (userScore === 0) {
          user.score -= 2;
        }

        await user.save();
      });

      res.status(200).send({});
  }
}
