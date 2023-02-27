import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next/types";
import dbConnect from "../../../../libs/dbConnect";
import { now } from "../../../../libs/utils/dateUtils";
import { User } from "../../../../models/user";
import { Vote } from "../../../../models/vote";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const week = req.query.week.toString();

  await dbConnect();

  switch (method) {
    case "GET":
      const allUser = await User.find({ isActive: true });
      const attendForm = allUser.reduce((accumulator, user) => {
        return { ...accumulator, [user.name]: 0 };
      }, {});

      const today = now().format("YYYY-MM-DD");
      const targetDay = now()
        .subtract(parseInt(week), "week")
        .format("YYYY-MM-DD");

      const forParticipation = await Vote.collection
        .aggregate([
          {
            $match: {
              date: {
                $gte: dayjs(targetDay).toDate(),
                $lt: dayjs(today).toDate(),
              },
            },
          },
          {
            $unwind: "$participations",
          },
          {
            $project: {
              status: "$participations.status",
              attendences: "$participations.attendences",
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

      const participationCnt = forParticipation
        .filter((vote) => vote.status === "open")
        .flatMap((vote) => vote.attendences)
        .flatMap((attendence) => attendence.user)
        .map((user) => user.name)
        .reduce((acc, val) => {
          if (val in acc) {
            acc[val]++;
          } else {
            acc[val] = 1;
          }
          return acc;
        }, {});

      res.status(200).json({ ...attendForm, ...participationCnt });
  }
}
