import dayjs from "dayjs";

import { User } from "../models/user";
import { Vote } from "../models/vote";

export const getParticipationRate = async (
  startDay: string,
  endDay: string
) => {
  const allUser = await User.find({ isActive: true });
  const attendForm = allUser.reduce((accumulator, user) => {
    return { ...accumulator, [user.name]: 0 };
  }, {});

  const forParticipation = await Vote.collection
    .aggregate([
      {
        $match: {
          date: {
            $gte: dayjs(startDay).toDate(),
            $lt: dayjs(endDay).toDate(),
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

  return { ...attendForm, ...participationCnt };
};
