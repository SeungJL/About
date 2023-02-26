import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next/types";
import dbConnect from "../../../libs/dbConnect";
import { User } from "../../../models/user";
import { Vote } from "../../../models/vote";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

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
                $gte: dayjs("2023-02-23").toDate(),
                $lt: dayjs("2023-02-26").toDate(),
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

      console.log(2, { ...attendForm, ...voteCnt });
  }
}
