import dayjs, { Dayjs } from "dayjs";
import { NextApiRequest, NextApiResponse } from "next/types";
import dbConnect from "../../../libs/dbConnect";
import { now } from "../../../libs/utils/dateUtils";

import { User } from "../../../models/user";
import { Vote } from "../../../models/vote";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  const { startDay, endDay } = req.query as {
    startDay: string;
    endDay: string;
  };

  await dbConnect();

  switch (method) {
    case "GET":
      const allUser = await User.find({ isActive: true });
      const attendForm = allUser.reduce((accumulator, user) => {
        return { ...accumulator, [user.name]: 0 };
      }, {});

      const forVote = await Vote.collection
        .aggregate([
          {
            $match: {
              date: {
                $gte: dayjs(startDay).toDate(),
                $lt: dayjs(endDay).toDate(),
              },
            },
          },
          { $unwind: "$participations" },
          { $unwind: "$participations.attendences" },
          {
            $project: {
              attendences: "$participations.attendences",
            },
          },
          {
            $project: {
              firstChoice: "$attendences.firstChoice",
              attendences: "$attendences",
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "attendences.user",
              foreignField: "_id",
              as: "attendences.user",
            },
          },
        ])
        .toArray();

      const voteCnt = forVote
        .flatMap((participation) => participation.attendences)
        .filter((attendence) => attendence.firstChoice === true)
        .flatMap((attendance) => attendance.user)
        .map((user) => user.name)
        .reduce((acc, val) => {
          if (val in acc) {
            acc[val]++;
          } else {
            acc[val] = 1;
          }
          return acc;
        }, {});

      const voteRateForm = { ...attendForm, ...voteCnt };
      const result = [];

      for (let value in voteRateForm) {
        result.push({ name: value, cnt: voteRateForm[value] });
      }

      res.status(200).json(result);
  }
}
