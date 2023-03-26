import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../models/user";

import { getParticipationRate } from "../../../services/rateService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

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
              name: 1,
              score: 1,
            },
          },
        ])
        .toArray();

      res.status(200).send(userScore);
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
